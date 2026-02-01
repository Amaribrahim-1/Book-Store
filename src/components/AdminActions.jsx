import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBooks } from "../contexts/BooksProvider";
import { useTheme } from "../contexts/ThemeProvider";
import { showNotification } from "../utils/showNotification";
import BookModal from "./BookModal";
import ConfirmationModal from "./ConfirmationModal";
import Spinner from "./Spinner";
import useLockBodyScroll from "../hooks/useLockBodyScroll";

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
  // async function handleSubmitBook(data, mode) {
  //   try {
  //     setIsLoading(true);

  //     if (mode === "edit") {
  //       const res = await axios.patch(
  //         `http://localhost:8000/books/${book.id}`,
  //         data,
  //       );

  //       setBooks((books) =>
  //         books.map((b) => (b.id === book.id ? { ...b, ...res.data } : b)),
  //       );

  //       showNotification(
  //         "success",
  //         `${book.title} updated successfully`,
  //         theme,
  //       );
  //     }

  //     if (mode === "add") {
  //       const res = await axios.post("http://localhost:8000/books", data);

  //       setBooks((books) => [...books, res.data]);

  //       showNotification("success", `Book added successfully`, theme);
  //     }

  //     setShowEdit(false);
  //   } catch (err) {
  //     showNotification("error", "Something went wrong", theme);
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

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
