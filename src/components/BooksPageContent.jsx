import Book from "./Book";

function BooksPageContent({ displayedBooks }) {
  return (
    <section className="books-page__content">
      <div className="books-page__results">
        <div className="results-header">
          {/* <p>{displayedBooks.length} books found in this page</p> */}
          {/* <p><span>{displayedBooks.length}</span> books found</p> */}
        </div>

        <ul className="books-grid">
          {displayedBooks.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BooksPageContent;
