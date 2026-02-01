import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { showNotification } from "../utils/showNotification";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  useEffect(() => {
    if (isAuthenticated) {
      const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(storedItems);
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, cur) => acc + cur.price * cur.qauntity, 0);
  }, [cartItems]);

  const cartBadge = useMemo(() => {
    return cartItems.reduce((acc, cur) => acc + cur.qauntity, 0);
  }, [cartItems]);

  useEffect(() => {
    if (!isAuthenticated) return;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, isAuthenticated]);

  const addToCart = useCallback(
    function addToCart(newItem, qauntity = 1) {
      if (!isAuthenticated) {
        showNotification(
          "info",
          "You must login at first",
          localStorage.getItem("theme"),
        );
        return;
      }

      const cartBook = cartItems.find((item) => item.id === newItem.id);

      const greaterThanStock =
        cartBook?.qauntity > newItem.stock - 1 ||
        qauntity + cartBook?.qauntity > newItem.stock;

      if (greaterThanStock) {
        qauntity = newItem.stock - cartBook?.qauntity;
        if (qauntity < 0) qauntity = 0;
        showNotification(
          "info",
          `${qauntity == 0 ? `“You’ve reached the maximum available quantity for this item.”` : `“Only ${qauntity} items were available, so we added those to your cart.”`}`,
          localStorage.getItem("theme"),
        );
      }

      setCartItems((cartItems) => {
        const existBook = cartItems.find((item) => item.id === newItem.id);

        if (existBook) {
          return cartItems.map((item) =>
            item.id === newItem.id
              ? { ...item, qauntity: item.qauntity + qauntity }
              : item,
          );
        }

        return [...cartItems, { ...newItem, qauntity }];
      });

      !greaterThanStock &&
        showNotification(
          "success",
          `${newItem.title} Book added to cart successfully`,
          localStorage.getItem("theme"),
        );
    },
    [cartItems, isAuthenticated],
  );

  const removeFromCart = useCallback(function removeFromCart(id) {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));

    showNotification(
      "success",
      `Book Deleted successfully`,
      localStorage.getItem("theme"),
    );
  }, []);

  const increaseQuantity = useCallback(function increaseQuantity(id) {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id ? { ...item, qauntity: item.qauntity + 1 } : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback(function decreaseQuantity(id) {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id ? { ...item, qauntity: item.qauntity - 1 } : item,
      ),
    );
  }, []);

  const value = useMemo(() => {
    return {
      cartItems,
      addToCart,
      removeFromCart,
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
      cartBadge,
    };
  }, [
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    cartBadge,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("The context outside the provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
