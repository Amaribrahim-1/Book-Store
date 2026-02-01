// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import AboutPage from "./pages/AboutPage";
// import BookDetails from "./pages/BookDetails";
// import BooksPage from "./pages/BooksPage";
// import Checkout from "./pages/Checkout";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";

// import { BooksProvider } from "./contexts/BooksProvider";
// import { ThemeProvider } from "./contexts/ThemeProvider";

// import { ToastContainer } from "react-toastify";
// import { AuthProvider } from "./contexts/AuthProvider";
// import { CartProvider } from "./contexts/CartProvider";
// import WishList from "./pages/WishList";
// import AdminPage from "./pages/AdminPage";
// import AdminRoute from "./pages/AdminRoute";
// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <CartProvider>
//           <ToastContainer />
//           <BooksProvider>
//             <BrowserRouter>
//               <Routes>
//                 {/* <Route element={<ProtectedRoute />}> */}
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="admin" element={<AdminPage />} />
//                 <Route path="books" element={<BooksPage />} />
//                 <Route path="wishlist" element={<WishList />} />
//                 <Route path="about" element={<AboutPage />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/:id" element={<BookDetails />} />
//                 {/* <Route path="checkout" element={<Checkout />} /> */}
//                 {/* </Route> */}

//                 <Route element={<AdminRoute />}>
//                   <Route path="admin/*" element={<AdminPage />} />
//                 </Route>

//                 <Route path="*" element={<PageNotFound />} />
//               </Routes>
//             </BrowserRouter>
//           </BooksProvider>
//         </CartProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import BookDetails from "./pages/BookDetails";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import WishList from "./pages/WishList";
import AdminPage from "./pages/AdminPage";

import UserLayout from "./layouts/UserLayout.jsx";
import AdminRoute from "./pages/AdminRoute";

import { BooksProvider } from "./contexts/BooksProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartProvider";

import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <BooksProvider>
            <BrowserRouter>
              <Routes>
                {/* ===== Public ===== */}
                <Route path="/login" element={<Login />} />

                {/* ===== User Layout ===== */}
                <Route element={<UserLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="books" element={<BooksPage />} />
                  <Route path="wishlist" element={<WishList />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path=":id" element={<BookDetails />} />
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
            </BrowserRouter>
          </BooksProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
