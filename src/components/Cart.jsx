import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../contexts/CartProvider";
import CartItem from "./CartItem";

function Cart({ setIsCartOpen }) {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className="shopping-cart">
        <div className="shopping-cart__header">
          <h2>Shopping Cart ({cartItems.length})</h2>
          <button
            className="shopping-cart__close"
            onClick={() => setIsCartOpen((isCartOpen) => !isCartOpen)}
          >
            <X size={24} />
          </button>
        </div>

        <ul className="shopping-cart__items">
          {cartItems.length === 0 && (
            <div className="shopping-cart__empty">
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
            </div>
          )}

          {cartItems.map((item) => (
            <CartItem
              item={item}
              key={item.id}
              removeFromCart={removeFromCart}
            />
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div className="shopping-cart__footer">
            <div className="shopping-cart__total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn--primary btn--block">Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
