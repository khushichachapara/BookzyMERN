import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import BookCart from "../BookCart/BookCart";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ViewDataDetails = () => {
  const { id } = useParams();
  //console.log(id);
  const navigate = useNavigate();

  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  //console.log(isLoggedIn);
  //console.log(role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      console.log(response);

      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      { bookid: data._id },
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books ");
  };

  return (
    <>
      {data && (
        <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="  w-full lg:w-3/6 ">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 py-12 rounded gap:0 lg:gap-8">
              <img
                src={data.url}
                alt="/"
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col mt-8  items-center justify-between lg:justify-start lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-600 hover:scale-110 flex items-center justify-center"
                    onClick={handleFavourite}
                  >
                    {" "}
                    <FaHeart />{" "}
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className="text-white mt-8 md:mt-0 rounded lg:rounded-full  text-4xl lg:text-3xl p-3 lg:mt-8 bg-blue-500 hover:scale-110 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    {" "}
                    <FaShoppingCart />{" "}
                    <span className="ms-4 block lg:hidden">Add to Cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col mt-8  items-center justify-between lg:justify-start lg:mt-0">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3  hover:scale-110 flex items-center justify-center"
                  >
                    {" "}
                    <FaEdit />{" "}
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button
                    className="text-red-600 rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl  p-3 lg:mt-8 bg-white hover:scale-110 flex items-center justify-center"
                    onClick={deleteBook}
                  >
                    {" "}
                    <AiFillDelete />{" "}
                    <span className="ms-4 block lg:hidden">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}{" "}
            </h1>
            <p className=" text-zinc-400 mt-1">by {data.author}</p>
            <p className=" text-zinc-500 mt-4 text-xl"> {data.desc}</p>
            <p className=" flex mt-4 text-zinc-400 items-center justify-start ">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-xl font-semibold">
              price : ₹ {data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          Loader
        </div>
      )}
    </>
  );
};

export default ViewDataDetails;
