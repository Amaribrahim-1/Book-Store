import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="hero" aria-label="Hero Section">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">Discover Your Next Great Read</h1>
          <p className="hero__subtitle">
            Explore our curated collection of bestsellers, classics, and hidden
            gems
          </p>
          <Link to="/books">
            <button className="btn btn--primary btn--lg">Browse Books</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
