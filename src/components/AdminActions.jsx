import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBooks } from "../contexts/BooksProvider";
import { useTheme } from "../contexts/ThemeProvider";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import { showNotification } from "../utils/showNotification";
import ConfirmationModal from "./ConfirmationModal";
import Spinner from "./Spinner";

function AdminActions({ book }) {
  const { setBooks, isLoading, setIsLoading } = useBooks();
  const { theme } = useTheme();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useLockBodyScroll(showEdit);
  useLockBodyScroll(showDelete);

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      axios.delete(`http://localhost:8000/books/${id}`);
      setBooks((books) => books.filter((book) => book.id !== id));
      showNotification(
        "success",
        `${book.title} book deleted successfully`,
        theme,
      );
    } catch (err) {
      showNotification("error", `Failed in deleted book`, theme);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner message="Processing..." />;

  return (
    <div className="admin-controls-card">
      <button
        className="btn-icon-small btn-icon-small--edit"
        title="Edit book"
        onClick={() => setShowEdit(true)}
        disabled={true}
      >
        <Edit size={18} />
      </button>
      <button
        className="btn-icon-small btn-icon-small--delete"
        title="Delete book"
        onClick={() => setShowDelete(true)}
      >
        <Trash2 size={18} />
      </button>

      <ConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => handleDelete(book.id)}
        title="Delete Book"
        message="Are you sure you want to delete this book?"
        warning="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />

      {/* <BookModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        mode="edit"
        book={book}
        onSubmitForm={handleSubmitBook}
      /> */}
    </div>
  );
}

export default AdminActions;
