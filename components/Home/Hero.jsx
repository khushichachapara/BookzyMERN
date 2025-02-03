import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" h-[80vh] flex flex-col md:flex-row item-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-pink-200 text-center lg:text-left">
          Here Discover Your Next Read
        </h1>

        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Discover your next great read at Bookzy, your ultimate online
          bookstore with a vast collection and personalized recommendations.
          Enjoy an easy, secure shopping experience.
        </p>

        <div className="mt-8">
          <Link
            to="/all-books"
            className=" text-pink-200  text-xl lg:text-2xl font-semibold border border-pink-200 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/5 h-auto lg:h-[100%] flex-items-center justify-center">
        <img src="2.png" alt="2" ></img>
      </div>
    </div>
  );
};
export default Hero;