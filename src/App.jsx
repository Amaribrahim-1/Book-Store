import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout.jsx";
import AdminRoute from "./pages/AdminRoute";

import { AuthProvider } from "./contexts/AuthProvider";
import { BooksProvider } from "./contexts/BooksProvider";
import { CartProvider } from "./contexts/CartProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";

import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Spinner from "./components/Spinner.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const BooksPage = lazy(() => import("./pages/BooksPage.jsx"));
const BookDetails = lazy(() => import("./pages/BookDetails.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const WishList = lazy(() => import("./pages/WishList.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <BooksProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<Spinner />}>
                <Routes>
                  {/* ===== Public ===== */}
                  <Route path="/login" element={<Login />} />

                  {/* ===== User Layout ===== */}
                  <Route element={<UserLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="books/:id" element={<BookDetails />} />
                  </Route>

                  {/* ===== Admin (Protected) ===== */}
                  <Route element={<AdminRoute />}>
                    <Route path="admin" element={<AdminLayout />}>
                      <Route
                        index
                        element={<Navigate to="books-management" replace />}
                      />
                      <Route path="books-management" element={<BooksPage />} />
                      <Route path="about" element={<AboutPage />} />
                    </Route>
                  </Route>

                  {/* ===== 404 ===== */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </BooksProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
