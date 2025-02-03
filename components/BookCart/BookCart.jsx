import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCart = ({ data, favourite }) => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {bookid: data._id},
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[20vh]" />
          </div>
          <h2 className="mt-4 text-white text-xl font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
          ₹ {data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-pink-500 px-4 py-2 border border-pink-900 text-white rounded mt-4"
          onClick={handleRemoveBook}
        >
         Clear from Favourites
        </button>
      )}
    </div>
  );
};
export default BookCart;
