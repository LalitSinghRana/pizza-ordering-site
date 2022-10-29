import Button from "./elements/Button";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="banner px-12 lg:px-32 relative flex justify-between">
      <div className="banner-deescription p-3">
        <h2 className="mb-6 md:text-4xl font-bold text-white">
          When in doubt, Pizza...
        </h2>
        <p className="font-semibold lg:text-lg text-red-600 my-4">
          Get Started Today!
        </p>
        <div className="btn-container flex flex-col">
          <Link
            to="/custom"
            className="toggleColor text-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <Button>Create your own pizza</Button>
          </Link>
          <a
            href="#pizza-carousle"
            className="md:text-lg text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3 mt-4"
          >
            See Menu
          </a>
        </div>
      </div>
      <div className="banner-image p-3">
        <img
          src={require("../assets/images/pizza_banner.png")}
          alt="banner"
          className="max-h-96"
        />
      </div>
    </div>
  );
};
