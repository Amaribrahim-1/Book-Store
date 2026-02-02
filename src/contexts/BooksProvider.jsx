import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import Spinner from "../components/Spinner";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  const [favoriteBooks, setFavoriteBooks] = useState(
    () => JSON.parse(localStorage.getItem("favoriteBooks")) || [],
  );

  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favoriteBooks")) || [];
      setFavoriteBooks(storedFavorites);
    } else {
      setFavoriteBooks([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }, [favoriteBooks, isAuthenticated]);

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
        const res = await axios.get("/data/books.json");
        setBooks(res.data.books);
      } catch (err) {
        setError("Failed to fetch books");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getBooks();
  }, []);

  const value = useMemo(() => {
    return {
      books,
      isLoading,
      setIsLoading,
      addToWishList,
      removeFromWishList,
      favoriteBooks,
      setBooks,
    };
  }, [books, isLoading, addToWishList, removeFromWishList, favoriteBooks]);

  if (isLoading) return <Spinner message="Loading Books..." />;
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
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) throw new Error("Outside Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooksProvider, useBooks };
