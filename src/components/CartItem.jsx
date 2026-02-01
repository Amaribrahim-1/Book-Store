import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartProvider";

import { showNotification } from "../utils/showNotification";
import ConfirmationModal from "./ConfirmationModal";

function CartItem({ item, removeFromCart }) {
  const { increaseQuantity, decreaseQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.qauntity);
  const [openDelete, setOpenDelete] = useState(false);

  function handlePlus() {
    if (quantity > item.stock - 1) {
      showNotification(
        "info",
        `“You’ve reached the maximum available quantity for this item.”`,
        localStorage.getItem("theme"),
      );
      return;
    }

    setQuantity((quantity) => quantity + 1);
    increaseQuantity(item.id);
  }

  function handleMinus() {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
    if (quantity > 1) decreaseQuantity(item.id);
  }

  function handleDelete() {
    removeFromCart(item.id);
    setOpenDelete(false);
  }

  return (
    <li className="cart-item">
      <img src={item.img} alt={item.title} className="cart-item__image" />
      <div className="cart-item__details">
        <h4>{item.title}</h4>
        <p>{item.author}</p>
        <span className="cart-item__price">${item.price}</span>
      </div>
      <div className="cart-item__actions">
        <div className="quantity-control">
          <button onClick={handleMinus}>
            <Minus size={16} />
          </button>
          <span>{quantity}</span>
          <button
            onClick={handlePlus}
            className={`${quantity > item.stock - 1 ? "disabled" : ""}`}
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          className="cart-item__remove"
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 size={18} />
        </button>

        <ConfirmationModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleDelete}
          title="Delete Book"
          message="Are you sure you want to delete this book?"
          warning="This action cannot be undone."
          confirmText="Delete"
          variant="danger"
        />
      </div>
    </li>
  );
}

export default CartItem;
