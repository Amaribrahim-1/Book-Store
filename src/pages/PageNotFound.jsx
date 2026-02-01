import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="container">
        <div className="error-message">
          <h2>Page not found</h2>
          <button
            className="btn btn--primary"
            onClick={() => navigate("/login")}
          >
            Back To Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
