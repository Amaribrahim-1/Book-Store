function BooksPageHeader({ NumberOfBooks }) {
  return (
    <section className="books-page__header">
      <h1>All Books</h1>
      <p>Browse our complete collection of {NumberOfBooks} books</p>
    </section>
  );
}

export default BooksPageHeader;
