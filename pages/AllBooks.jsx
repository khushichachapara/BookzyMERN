import React,{useEffect,useState} from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCart from "../components/BookCart/BookCart";

const AllBooks = () => {
    const [data, setData] = useState();
  
    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        setData(response.data.data);
      };
      fetch();
    }, [data]);

  return (
    
      <div className=" bg-zinc-900 auto px-12 py-8 ">{" "}
      <h4 className="text-3xl text-pink-200">All Books</h4>
      {!data && (
        <div className="w-full h-screen flex items-center justify-center">
        <Loader />
        {""}
      </div>
      )}
      <div className=" my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data &&
          data.map((items, i) => (
            <div key={i} className="hover:scale-105">
              <BookCart data={items} />
              {""}
            </div>
          ))}
      </div>
    </div>
    
  );
};
export default AllBooks;