import Header from "../components/Header";
import Main from "../components/Main";

function About() {
  return (
    <>
      <Header />
      <Main>
        <div className="page about-page">
          <div className="container">
            <div className="about-content">
              <h1>About BookHaven</h1>

              <section className="about-section">
                <h2>Our Story</h2>
                <p>
                  Welcome to BookHaven, your premier destination for discovering
                  and purchasing books from every genre imaginable. Founded in
                  2024, we've been committed to connecting readers with their
                  next favorite story.
                </p>
              </section>

              <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                  We believe that everyone deserves access to great literature.
                  Our mission is to make book shopping convenient, affordable,
                  and enjoyable for readers around the world. Whether you're
                  looking for the latest bestseller or a timeless classic, we're
                  here to help you find it.
                </p>
              </section>

              <section className="about-section">
                <h2>Why Choose Us?</h2>
                <ul className="about-list">
                  <li>📚 Extensive collection spanning all genres</li>
                  <li>⚡ Fast and reliable delivery</li>
                  <li>💰 Competitive prices and regular discounts</li>
                  <li>🎯 Personalized recommendations</li>
                  <li>🔒 Secure payment processing</li>
                  <li>💬 Responsive customer support</li>
                </ul>
              </section>

              <section className="about-section">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? We'd love to hear from you!</p>
                <div className="contact-info">
                  <p>📧 Email: support@bookhaven.com</p>
                  <p>📞 Phone: +1 (555) 123-4567</p>
                  <p>🏢 Address: 123 Book Street, Reading City, RC 12345</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default About;
