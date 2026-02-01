import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import FeaturedBooks from "../components/FeaturedBooks";
import Features from "../components/Features";

function HomePage() {
  return (
    <>
      <Header />
      <Main>
        <div className="page">
          <Banner />
          <FeaturedBooks />
          <Features />
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default HomePage;
