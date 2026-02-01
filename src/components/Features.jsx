import { Book, Search, ShoppingCart } from "lucide-react";

function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <Book size={40} />
            <h3>Wide Selection</h3>
            <p>Thousands of books across all genres</p>
          </div>
          <div className="feature-card">
            <ShoppingCart size={40} />
            <h3>Easy Shopping</h3>
            <p>Simple and secure checkout process</p>
          </div>
          <div className="feature-card">
            <Search size={40} />
            <h3>Smart Search</h3>
            <p>Find exactly what you're looking for</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
