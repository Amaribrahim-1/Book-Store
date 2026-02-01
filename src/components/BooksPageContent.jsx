import Book from "./Book";

function BooksPageContent({ displayedBooks }) {
  // Current page?
  // const []

  return (
    <section className="books-page__content">
      <div className="books-page__results">
        <div className="results-header">
          {/* <p>{displayedBooks.length} books found in this page</p> */}
          {/* <p><span>{displayedBooks.length}</span> books found</p> */}
        </div>
        <div className="books-grid">
          {displayedBooks.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BooksPageContent;
