import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        console.log("Response data:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900  text-white px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className=" w-full md:w-1/6  -auto lg:h-screen">
            <Sidebar data={Profile} />
            <MobileNav/>
          </div>
          <div className=" w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
export default Profile;
