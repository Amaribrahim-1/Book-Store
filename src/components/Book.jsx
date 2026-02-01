import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

import { Star } from "lucide-react";
import { useAuth } from "../contexts/AuthProvider";
import { useBooks } from "../contexts/BooksProvider";
import useIsAdminRoute from "../hooks/useIsAdminRoute";
import { showNotification } from "../utils/showNotification";
import AdminActions from "./AdminActions";
import { memo } from "react";

function Book({ book }) {
  const { addToCart } = useCart();
  const { addToWishList, favoriteBooks, removeFromWishList } = useBooks();
  const isAdminRoute = useIsAdminRoute();
  const { isAuthenticated } = useAuth();

  const isBookExisted = favoriteBooks.find((favBook) => favBook.id === book.id);

  function handleClick(book) {
    if (!isAuthenticated) {
      showNotification(
        "info",
        "You need to be logged in to continue",
        localStorage.getItem("theme"),
      );
      return;
    }

    if (isBookExisted) removeFromWishList(book.id);
    else addToWishList(book);

    showNotification(
      "success",
      `${book.title} ${isBookExisted ? `Book removed from wishlist successfully` : `Book added to wishlist successfully`} `,
      localStorage.getItem("theme"),
    );
  }

  return (
    <li className="book-card">
      <div className="book-card__image">
        {!isAdminRoute && (
          <Star
            size={30}
            className={isBookExisted ? `star clicked` : `star`}
            onClick={() => handleClick(book)}
          />
        )}

        {/* Stock Badge */}
        {isAdminRoute &&
          (book.stock === 0 ? (
            <span className="stock-badge out">Out of stock</span>
          ) : (
            <span className="stock-badge in">In stock: {book.stock}</span>
          ))}

        <img alt={`Cover of ${book.title}`} src={book.img} loading="lazy" />
        <div className="book-card__overlay">
          {!isAdminRoute && (
            <Link to={`/books/${book.id}`}>
              <button className="btn btn--primary">View Details</button>
            </Link>
          )}
        </div>
      </div>
      <div className="book-card__content">
        <span className="book-card__category">{book.category}</span>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">By {book.author}</p>
        <div className="book-card__footer">
          <div className="book-card__rating">⭐ {book.rating}</div>
          <span className="book-card__price">${book.price}</span>
        </div>
        {!isAdminRoute && (
          <button
            className="btn btn--primary btn--block"
            onClick={() => addToCart(book)}
          >
            Add to Cart
          </button>
        )}
        {isAdminRoute && <AdminActions book={book} />}
      </div>
    </li>
  );
}

export default memo(Book);
