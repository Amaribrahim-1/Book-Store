import Banner from "../components/Banner";
import FeaturedBooks from "../components/FeaturedBooks";
import Features from "../components/Features";

function HomePage() {
  return (
    <div className="page">
      <Banner />
      <FeaturedBooks />
      <Features />
    </div>
  );
}

export default HomePage;
