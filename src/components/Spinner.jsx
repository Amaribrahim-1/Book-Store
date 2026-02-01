function Spinner({ message }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Spinner;
