import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Book, Info, Menu, Moon, Sun, X } from "lucide-react";

import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
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
            <NavLink to="/admin/books-management" className="nav__link ">
              <Book size={18} />
              Books Management
            </NavLink>

            <NavLink to="/admin/about" className="nav__link ">
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
              to="/admin/books-management"
              className="mobile-nav__link"
              onClick={closeMobileMenu}
            >
              <Book size={18} />
              Books Management
            </NavLink>
            <NavLink
              to="/admin/about"
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
