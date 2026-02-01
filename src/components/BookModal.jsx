import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { Save, X } from "lucide-react";
import { useBooks } from "../contexts/BooksProvider";

function BookModal({
  isOpen,
  onClose,
  mode = "edit", // "edit" | "add"
  book = null,
  onSubmitForm,
}) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: isEdit && book ? book : {},
  });

  const { books } = useBooks();
  const categories = [...new Set(books.map((book) => book.category))];

  useEffect(() => {
    if (isOpen) {
      reset(isEdit && book ? book : {});
    }
  }, [isOpen, isEdit, book, reset]);

  function onSubmit(data) {
    if (isEdit) {
      const updatedFields = {};

      Object.keys(dirtyFields).forEach((key) => {
        updatedFields[key] = data[key];
      });

      if (Object.keys(updatedFields).length === 0) return;

      onSubmitForm(updatedFields, "edit");
    } else {
      onSubmitForm(data, "add");
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal modal--large" role="dialog" aria-modal="true">
        {/* Header */}
        <header className="modal__header">
          <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>

          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Form */}
        <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1 */}
          <div className="book-form__row">
            <div className="book-form__group">
              <label className="book-form__label">Title *</label>
              <input
                className="book-form__input"
                {...register(
                  "title",
                  isEdit ? {} : { required: "Title is required" },
                )}
              />
              {errors.title && (
                <small className="form-error">{errors.title.message}</small>
              )}
            </div>

            <div className="book-form__group">
              <label className="book-form__label">Author *</label>
              <input
                className="book-form__input"
                {...register(
                  "author",
                  isEdit ? {} : { required: "Author is required" },
                )}
              />
              {errors.author && (
                <small className="form-error">{errors.author.message}</small>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="book-form__row">
            <div className="book-form__group">
              <label className="book-form__label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="book-form__input"
                {...register("price")}
              />
            </div>

            <div className="book-form__group">
              <label className="book-form__label">Category</label>
              <select className="book-form__input" {...register("category")}>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="book-form__row">
            <div className="book-form__group">
              <label className="book-form__label">Rating (0–5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="book-form__input"
                {...register("rating")}
              />
            </div>

            <div className="book-form__group">
              <label className="book-form__label">Stock</label>
              <input
                type="number"
                min="0"
                className="book-form__input"
                {...register("stock")}
              />
            </div>
          </div>

          {/* Image (UI only) */}
          <div className="book-form__group">
            <label className="book-form__label">Cover Image</label>
            <input type="file" accept="image/*" className="book-form__file" />
          </div>

          {/* Description */}
          <div className="book-form__group">
            <label className="book-form__label">Description</label>
            <textarea
              rows="4"
              className="book-form__input book-form__textarea"
              {...register("description")}
            />
          </div>

          {/* Actions */}
          <footer className="book-form__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn--primary">
              <Save size={18} />
              {isEdit ? "Update Book" : "Add Book"}
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default BookModal;
