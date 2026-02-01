import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [favoriteBooks, setFavoriteBooks] = useState(
    () => JSON.parse(localStorage.getItem("favoriteBooks")) || [],
  );

  useEffect(
    function () {
      localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    },
    [favoriteBooks],
  );

  const addToWishList = useCallback(function addToWishList(newBook) {
    setFavoriteBooks((favoriteBooks) => {
      const existBook = favoriteBooks.find((book) => book.id === newBook.id);

      if (existBook) return favoriteBooks;
      else return [...favoriteBooks, newBook];
    });
  }, []);

  const removeFromWishList = useCallback(function removeFromWishList(id) {
    setFavoriteBooks((favoriteBooks) =>
      favoriteBooks.filter((book) => book.id !== id),
    );
  }, []);

  useEffect(function () {
    async function getBooks() {
      try {
        setIsLoading(true);
        const res = await axios.get(" http://localhost:8000/books");
        setBooks(res.data);
      } catch (err) {
        setError("Failed to fetch books");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getBooks();
  }, []);

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-message">
            <h2>Books not found. Check the server</h2>
            <button
              className="btn btn--primary"
              onClick={() => location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        addToWishList,
        removeFromWishList,
        favoriteBooks,
        setBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) throw new Error("Outside Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooksProvider, useBooks };
