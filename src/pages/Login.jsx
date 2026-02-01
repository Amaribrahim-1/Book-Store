import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";
import { showNotification } from "../utils/showNotification";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, password } = data;

    const result = login(email, password);
    if (result.success) {
      if (result.role === "user") navigate("/");
      else navigate("/admin");
    }

    reset();
    setShowPassword(false);
  }

  function onError(errors) {
    const firstError = Object.values(errors)[0];
    showNotification("error", firstError.message, theme);
  }

  return (
    <div className="page login-page">
      <div className="login-container">
        <div className="login-card">
          <button
            className="icon-btn theme-login"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Login to access your account</p>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="login-form"
          >
            {/* Email */}
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="form-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-input"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={`${showPassword ? "Hide Password" : "Show Password"}`}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
