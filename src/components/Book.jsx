import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

import { Edit, Star, Trash2 } from "lucide-react";
import { showNotification } from "../utils/showNotification";
import { useBooks } from "../contexts/BooksProvider";
import { useAuth } from "../contexts/AuthProvider";
import AdminActions from "./AdminActions";

function Book({ book }) {
  const { addToCart } = useCart();
  const { addToWishList, favoriteBooks, removeFromWishList } = useBooks();
  const { role } = useAuth();

  const isBookExisted = favoriteBooks.find((favBook) => favBook.id === book.id);

  function handleClick(book) {
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
        <Star
          size={30}
          className={isBookExisted ? `star clicked` : `star`}
          onClick={() => handleClick(book)}
        />

        {/* Stock Badge */}
        {/* {book.stock === 0 ? (
          <span className="stock-badge out">Out of stock</span>
        ) : (
          <span className="stock-badge in">In stock: {book.stock}</span>
        )} */}

        <img alt={book.img} src={book.img} />
        <div className="book-card__overlay">
          <Link to={`/${book.id}`}>
            <button className="btn btn--primary">View Details</button>
          </Link>
        </div>
      </div>
      <div className="book-card__content">
        <span className="book-card__category">{book.category}</span>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">By {book.author}</p>
        <div className="book-card__footer">
          <div className="book-card__rating">⭐ {book.rating}</div>
          <span className="book-card__price">${book.price}.00</span>
        </div>
        <button
          className="btn btn--primary btn--block"
          onClick={() => addToCart(book)}
        >
          Add to Cart
        </button>
        {role === "admin" ? <AdminActions book={book} /> : null}
      </div>
    </li>
  );
}

export default Book;
