import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function AdminActions({ book }) {
  const [showDelete, setShowDelete] = useState(false);
  function handleDelete() {
    console.log(book);
    // Delete Request...
    // Nested route
  }
  return (
    <div className="admin-controls-card">
      <button className="btn-icon-small btn-icon-small--edit" title="Edit book">
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
    </div>
  );
}

export default AdminActions;
