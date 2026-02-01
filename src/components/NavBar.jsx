import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Book,
  Heart,
  HomeIcon,
  Info,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";

import { useCart } from "../contexts/CartProvider";
import { useTheme } from "../contexts/ThemeProvider";
import Cart from "./Cart";
import { useAuth } from "../contexts/AuthProvider";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartBadge } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <NavLink to="/" className="logo">
            <Book size={28} />
            <span>BookHaven</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="nav">
            <NavLink to="/" className="nav__link nav__link--active">
              <HomeIcon size={18} />
              Home
            </NavLink>
            <NavLink to="/books" className="nav__link ">
              <Book size={18} />
              Books
            </NavLink>
            <NavLink to="/wishlist" className="nav__link ">
              <Heart size={18} />
              WishList
            </NavLink>
            <NavLink to="/about" className="nav__link ">
              <Info size={18} />
              About
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <button
              className="icon-btn"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="icon-btn cart-btn"
              onClick={() => setIsCartOpen((isCartOpen) => !isCartOpen)}
            >
              <ShoppingCart size={20} />
              {cartBadge > 0 && <span className="cart-badge">{cartBadge}</span>}
            </button>

            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="btn btn--primary btn--md logout-btn"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="btn btn--primary btn--sm login-btn"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <NavLink
              to="/"
              className="mobile-nav__link"
              onClick={closeMobileMenu}
            >
              <HomeIcon size={18} />
              Home
            </NavLink>
            <NavLink
              to="/books"
              className="mobile-nav__link"
              onClick={closeMobileMenu}
            >
              <Book size={18} />
              Books
            </NavLink>
            <NavLink
              to="/wishlist"
              className="mobile-nav__link"
              onClick={closeMobileMenu}
            >
              <Heart size={18} />
              WishList
            </NavLink>
            <NavLink
              to="/about"
              className="mobile-nav__link"
              onClick={closeMobileMenu}
            >
              <Info size={18} />
              About
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default NavBar;
