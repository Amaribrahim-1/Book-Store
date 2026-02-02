# Online Bookstore

A modern online bookstore built with React, focusing on real-world e-commerce logic, clean UI behavior, performance, and accessibility.

This project is part of my frontend journey, focusing on writing clean, scalable, and maintainable React applications.

## Features

### User Features

**Browse and Search**
- View featured books on the home page
- Search books by title with partial matching
- Filter books by category
- Pagination for easy navigation through the book catalog

**Book Details**
- View detailed information for each book
- Add books to wishlist
- Add books to cart with quantity selection
- Real-time price calculation based on selected quantity
- Stock availability checking

**Shopping Cart**
- Add multiple books with quantity management
- Automatic quantity increment for duplicate items
- Remove items with confirmation modal
- Adjust quantities directly in the cart
- Real-time total price calculation
- Stock limit enforcement
- Minimum quantity validation

**Wishlist**
- Add and remove favorite books
- Quick access to saved items

**User Account**
- Login and logout functionality
- Persistent cart and wishlist data in local storage
- Data cleared on logout and restored on login

### Admin Features

**Book Management**
- View all books with search and filter capabilities
- Delete books with confirmation
- Pagination for book lists
- Browse the store as a regular user

### General Features

**UI/UX**
- Fully responsive design
- Dark and light theme toggle
- Clear notification system for all actions
- Loading indicators during data fetching
- Accessible navigation with proper ARIA labels
- Semantic HTML structure

**Authentication**
- Login required for cart and wishlist features
- Role-based access control
- Admin-only routes protection

## Technology Stack

**Core**
- React (Components, Hooks, JSX)
- Vite (Build tool and development server)
- React Router (including nested routes)
- Context API for state management

**State Management**
- useState for component state
- useReducer for complex state logic
- Custom hooks for reusable logic

**Performance Optimization**
- React.memo for component memoization
- useMemo and useCallback for value and function memoization
- Lazy loading and code splitting
- WebP image format with lazy loading
- Suspense for loading states

**Data and Forms**
- Axios for API requests
- React Hook Form for login validation
- JSON data source

**UI Libraries**
- Lucide React for icons
- Custom CSS for styling

**Storage**
- Local storage for user data, theme, cart, and wishlist

## Project Structure

The application uses a component-based architecture with proper separation of concerns and reusable components throughout the codebase.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Test Accounts

You can use these accounts to test the application:

**User Account**
- Email: user@test.com
- Password: 123456

**Admin Account**
- Email: admin@test.com
- Password: 123456

## User Roles

**Regular User**
- Browse books
- Search and filter
- Add to cart and wishlist
- Make purchases

**Admin**
- All user capabilities
- Access to admin panel
- Manage books (delete, with edit and add coming soon)

## Future Enhancements

- Add book functionality for admin
- Edit book functionality for admin
- Additional admin management features

## Access Control

- Users cannot access admin routes and will be redirected to login
- Admin can browse as a regular user but has additional privileges
- Authentication required for cart and wishlist operations

## Notes

All user interactions include appropriate notifications with different styles for success, error, and informational messages.
