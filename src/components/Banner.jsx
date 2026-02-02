import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="hero" aria-label="Hero Section">
      <div className="hero__image-container">
        <img
          src="/images/banner.webp"
          alt="BookHaven - Your Online Bookstore"
          className="hero__image"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="hero__overlay"></div>

      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">A safe place for book lovers</h1>
          <Link to="/books">
            <button className="btn btn--primary btn--lg">Browse Books</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
