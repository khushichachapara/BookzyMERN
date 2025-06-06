import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.log("error is:", error);
      }
    };
    fetch();
  }, [FavouriteBooks]);
  return (
    <>
      { FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="text-4xl font-semibold h-[100%] text-pink-500 flex  flex-col items-center justify-center w-full">
          No Favourite Books
          <img src="./bookmark.png" alt="Nofavourite" className="h-[20vh] mt-8 "/>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCart data={items} favourite={true} />{" "}
            </div>
          ))}
      </div>
    </>
  );
};
export default Favourites;
