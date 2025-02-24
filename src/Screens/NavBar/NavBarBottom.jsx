import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Category = "https://playerstorage.b-cdn.net/quiztwiz/assets/category.svg";
const Home = "https://playerstorage.b-cdn.net/quiztwiz/assets/home.svg";
const Profile = "https://playerstorage.b-cdn.net/quiztwiz/assets/profile.svg";

import { useDispatch, useSelector } from "react-redux";

const NavBar = (props) => {
  const history = useHistory();
  let userData = useSelector((state) => state.userData);
  // console.log("-----User Data------- ", userData);

  // let [activeTab, setActiveTab] = useState("home");

  const switchTab = (tab) => {
    switch (tab) {
      case "category":
        props.setActiveTab("category");

        history.push("/home/categories");
        break;
      case "profile":
        props.setActiveTab("profile");
        history.push("/home/profile");
        break;
      case "home":
      default:
        props.setActiveTab("home");
        history.push({
          pathname: "/home",
          state: { fromNav: true },
        });
    }
  };

  return (
    <>
      <div
        className="bg-bg flex px-1 pb-2 items-center justify-evenly fixed left-0 min-w-[520px] max-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full bottom-0 text-xs"
        style={{ boxShadow: "0px -15px 15px #111827" }}
      >
        <div
          className={
            props.activeTab == "category"
              ? "flex flex-col bg-secondary px-5 py-2 items-center rounded-full w-[100px]"
              : "flex flex-col px-5 py-2 rounded-full items-center w-[100px]"
          }
          onClick={() => switchTab("category")}
        >
          {/* <img src={Category} alt="Category" className="h-4 pb-1" /> */}
          {props.activeTab == "category" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          )}
          <p className="mt-1">Category</p>
        </div>
        <div
          className={
            props.activeTab == "home"
              ? "flex flex-col px-5 py-2 rounded-full items-center bg-secondary w-[100px]"
              : "flex flex-col px-5 py-2 rounded-full items-center w-[100px]"
          }
          onClick={() => switchTab("/home")}
        >
          {/* <img src={Home} alt="Home" className="h-4 pb-1" /> */}
          {props.activeTab == "home" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          )}
          <p className="mt-1">Home</p>
        </div>
        <div
          className={
            props.activeTab == "profile"
              ? "flex flex-col px-5 py-2 rounded-full items-center bg-secondary w-[100px]"
              : "flex flex-col px-5 py-2 rounded-full items-center w-[100px]"
          }
          onClick={() => switchTab("profile")}
        >
          {/* <img src={Profile} alt="Profile" className="h-4 pb-1" /> */}
          {props.activeTab === "profile" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <p className="mt-1">Profile</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
