import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBooks } from "../contexts/BooksProvider";
import { useCart } from "../contexts/CartProvider";

import Book from "../components/Book";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthProvider";
import { showNotification } from "../utils/showNotification";

function BookDetails() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const { id } = useParams();
  const { books, isLoading, addToWishList, favoriteBooks, removeFromWishList } =
    useBooks();
  const [quantity, setQuantity] = useState(1);

  const displayedBook = useMemo(() => {
    return books.find((book) => book.id === Number(id));
  }, [books, id]);

  if (isLoading) return <Spinner message={"Loading book..."} />;

  if (!displayedBook) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-message">
            <h2>Book not found</h2>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/books")}
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = quantity * displayedBook.price;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const relatedBooks = useMemo(() => {
    const relatedIds = displayedBook?.relatedBooks;
    if (!relatedIds) return [];

    return books.filter((book) => relatedIds.includes(book.id));
  }, [books, displayedBook]);

  const isBookExisted = favoriteBooks.find(
    (favBook) => favBook.id === Number(id),
  );

  function handlePlus() {
    if (quantity > displayedBook.stock - 1) {
      showNotification(
        "info",
        `“You’ve reached the maximum available quantity for this item.”`,
        localStorage.getItem("theme"),
      );
      return;
    }

    setQuantity((quantity) => quantity + 1);
  }
  function handleMinus() {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  }

  function handleAdd(book) {
    addToCart(book, quantity);
  }

  function handleClick(displayedBook) {
    if (!isAuthenticated) {
      showNotification(
        "info",
        "You must login at first",
        localStorage.getItem("theme"),
      );
      return;
    }

    if (isBookExisted) removeFromWishList(displayedBook.id);
    else addToWishList(displayedBook);
    showNotification(
      "success",
      `${displayedBook.title} ${isBookExisted ? `Book remover from wishlist successfully` : `Book added to wishlist successfully`} `,
      localStorage.getItem("theme"),
    );
  }

  return (
    <div className="page book-details-page">
      <div className="container">
        <button
          className="btn btn--secondary btn--back"
          onClick={() => navigate("/books")}
        >
          ← Back to Books
        </button>

        <div className="book-details">
          <div className="book-details__image">
            <img alt={displayedBook.title} src={displayedBook.img} />
          </div>
          <div className="book-details__content">
            <span className="book-details__category">
              {displayedBook.category}
            </span>
            <h1 className="book-details__title">{displayedBook.title}</h1>
            <p className="book-details__author">By {displayedBook.author}</p>
            <div className="book-details__meta">
              <div className="book-details__rating">
                ⭐ {displayedBook.rating} / 5.0
              </div>
            </div>
            <p className="book-details__description">
              {displayedBook.description}
            </p>
            <div className="book-details__price">
              <span className="price-label">Price:</span>
              <span className="price-value">${displayedBook.price}</span>
            </div>
            <div className="book-details__actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-control quantity-control--large">
                  <button onClick={handleMinus}>
                    <Minus size={18} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={handlePlus}
                    className={`${quantity > displayedBook.stock - 1 ? "disabled" : ""}`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => handleClick(displayedBook)}
                >
                  {isBookExisted ? "Remove From Wishlist" : `Add to Wishlist`}
                </button>
              </div>
              <button
                className="btn btn--primary btn--lg"
                onClick={() => handleAdd(displayedBook)}
              >
                Add to Cart ${totalPrice}.00
              </button>
            </div>
          </div>
        </div>
        <h2 className="books-related__title">Related Books</h2>
        <div className="books-grid">
          {relatedBooks.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
