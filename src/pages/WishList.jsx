import { useNavigate } from "react-router-dom";
import Book from "../components/Book";
import Header from "../components/Header";
import Main from "../components/Main";
import { useBooks } from "../contexts/BooksProvider";

function WishList() {
  const { favoriteBooks } = useBooks();
  const navigate = useNavigate();

  if (favoriteBooks.length === 0)
    return (
      <div className="page">
        <div className="container">
          <div className="error-message">
            <h2>WishList is empty. let's add some favorite books</h2>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/books")}
            >
              Go To Books
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <>
      <Header />
      <Main>
        <section className="page books-page">
          <div className="container">
            <div className="books-page__content">
              <div className="books-page__results">
                <div className="results-header">
                  <p>{favoriteBooks.length} books found</p>
                </div>
                <div className="books-grid">
                  {favoriteBooks.map((book) => (
                    <Book book={book} key={book.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Main>
    </>
  );
}

export default WishList;
