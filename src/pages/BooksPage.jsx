import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import BooksPageContent from "../components/BooksPageContent";
import BooksPageControls from "../components/BooksPageControls";
import BooksPageHeader from "../components/BooksPageHeader";
import Spinner from "../components/Spinner.jsx";
import { useBooks } from "../contexts/BooksProvider.jsx";

function BooksPage() {
  const { books, isLoading } = useBooks();
  const [search, setSearch] = useState("");
  const [filterOption, setFilterOption] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  let displayedBooks = books;

  if (filterOption !== "All") {
    displayedBooks = books.filter(
      (book) =>
        book.category.toLowerCase() === filterOption.toLocaleLowerCase(),
    );
  }

  displayedBooks = displayedBooks.filter((book) =>
    book.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const booksPerPage = 12;
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;

  const paginatedBooks = displayedBooks.slice(start, end);

  const totalPages = Math.ceil(displayedBooks.length / booksPerPage);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    setCurrentPage((cur) => {
      if (cur > 1) {
        scrollToTop();
        return cur - 1;
      }
      return cur;
    });
  }

  function handleNext() {
    setCurrentPage((cur) => {
      if (cur < totalPages) {
        scrollToTop();
        return cur + 1;
      }
      return cur;
    });
  }

  useEffect(
    function () {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1);
    },
    [search, filterOption],
  );

  if (isLoading) return <Spinner message={"Loading books..."} />;

  return (
    <div className="page books-page">
      <div className="container">
        <BooksPageHeader NumberOfBooks={books.length} />
        <BooksPageControls
          search={search}
          setSearch={setSearch}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          categories={categories}
        />
        <BooksPageContent displayedBooks={paginatedBooks} />

        <div className="pagination-bar">
          <p className="pagination-info">
            Showing <span>{start + 1}</span> to{" "}
            <span>{Math.min(end, books.length)}</span> of{" "}
            <span>{books.length}</span> results
          </p>

          <div className="pagination-actions">
            <button
              className="btn btn--primary"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <ArrowBigLeft size={20} />
              Previous
            </button>

            <button
              className="btn btn--primary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowBigRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
