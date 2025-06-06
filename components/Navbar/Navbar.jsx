import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },

    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  if (isLoggedIn == true && role === "user") {
    links.splice(4, 1);
  }

  if (isLoggedIn == true && role === "admin") {
    links.splice(3, 1);
  }

  

  

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className=" items-center flex ">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/12094/12094733.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold ">Bookzy</h1>
        </Link>
        <div className="nav-links-Bookzy block md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center">
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 border border-pink-500 rounded hover:bg-white hover:text-zinc-800 tansition-all duration"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-800 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/Login"
                className="px-4 py-1 border border pink-500 rounded hover:bg-white hover:text-zinc-800 tansition-all duration"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-pink-500 rounded hover:bg-white hover:text-zinc-800 tansition-all duration"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className=" block md:hidden text-white text-2xl hover:text-pink-200"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className=" text-white text-3xl mb-8 font-semibold hover:text-blue-800 transition-all duration-300"
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/Login"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold  py-2 border border pink-500 rounded text-white  hover:bg-white hover:text-zinc-800 tansition-all duration`}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className={` ${MobileNav} px-8  mb-8 text-3xl font-semibold py-2 bg-pink-500 rounded hover:bg-white hover:text-zinc-800 tansition-all duration`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default Navbar;
