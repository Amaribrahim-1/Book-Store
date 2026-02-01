import { useBooks } from "../contexts/BooksProvider";
import Book from "./Book";
import Spinner from "./Spinner";

function FeaturedBooks() {
  const { books, isLoading } = useBooks();

  if (isLoading) return <Spinner message={"Loading books..."} />;

  return (
    <section className="featured-section" aria-label="Featured Books Section">
      <div className="container">
        <h2 className="section-title">Featured Books</h2>
        <ul className="books-grid books-grid--featured">
          {books.map(
            (book, index) =>
              index >= 17 && index < 20 && <Book book={book} key={book.id} />,
          )}
        </ul>
      </div>
    </section>
  );
}

export default FeaturedBooks;
