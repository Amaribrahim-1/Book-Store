import { createContext, useContext, useReducer } from "react";
import { showNotification } from "../utils/showNotification";
import { useTheme } from "./ThemeProvider";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error(`Unknown action type: ${action.type}`);
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
      };
    case "logout":
      return initialState;
  }
}

const users = [
  {
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    email: "user@test.com",
    password: "123456",
    role: "user",
  },
];

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, role }, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("auth")) || initialState,
  );

  const { theme } = useTheme();

  function login(email, password) {
    const user = users.find((user) => user.email === email);
    if (!user) {
      showNotification("error", "User not found", theme);
      return { success: false };
    }

    if (user.password !== password) {
      showNotification("error", "Invalid email or password", theme);
      return { success: false };
    }

    if (user.email === email && user.password === password) {
      dispatch({ type: "login", payload: user });

      const auth = {
        user: user,
        isAuthenticated: true,
        role: user.role,
      };
      localStorage.setItem("auth", JSON.stringify(auth));

      showNotification(
        "success",
        `${user.role === "admin" ? `Admin Logged in successfully` : `User Logged in successfully`}`,
        theme,
      );
    }

    return { success: true, role: user.role };
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("auth");
    showNotification("success", "Logged out successfully", theme);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
