import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.desc === "" ||
        Data.price === "" ||
        Data.language === ""
      ) {
        alert("All Fields are Required ");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          desc: "",
          price: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`); 
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
  };
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

  return (
    <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-pink-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            placeholder="title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            placeholder="author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
              placeholder="language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
              placeholder="price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description Of Book
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            rows="5"
            placeholder="description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-pink-500 text-white font-semibold  py-2 rounded hover:bg-pink-600 transition-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};
export default UpdateBook;
