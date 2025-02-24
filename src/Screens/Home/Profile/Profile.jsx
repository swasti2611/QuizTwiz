import React, { useEffect } from "react";
const User = "https://playerstorage.b-cdn.net/quiztwiz/assets/user.png";
import { useSelector } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import { logoutUser } from "../../../API/Auth";
import GoogleAds from "../../../GoogleAds";
const Profile = () => {
  let history = useHistory();
  let userData = useSelector((state) => state.userReducer);
  // console.log("userdata", userData);
  if (userData.user == null) {
    userData = JSON.parse(sessionStorage.getItem("userData"));
  }
  let subdomain = window.location.href.split("//")[1].split(".")[0];

  let guestCoins = JSON.parse(sessionStorage.getItem("localCoins"))?.coins;
  const logoutUserNow = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logoutUser();

    // history.push("/home")
    sessionStorage.removeItem("userData");
    window.location.reload();
    // history.push("/");
  };
  let res = JSON.parse(sessionStorage.getItem("localQuiz"));

  return (
    <div className="flex justify-center items-center flex-col gap-7">
      <div className="flex justify-center w-full gap-10 mt-6">
        <div className="w-32 h-32 bg-primary rounded-full flex justify-center items-center">
          <img className=" h-32 rounded-full" src={User} alt="User Avatar" />
        </div>
        <div className="flex gap-1 flex-col items-center justify-center">
          <div className=" text-3xl">
            {userData?.user && userData?.user?.email
              ? userData.user.email
              : "User X"}
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center gap-10">
        <div className="w-[150px] py-2 px-4 rounded-full flex justify-between items-center bg-orange-500 border-2">
          <div className="text-sm">Coins</div>
          <div className="text-lg">
            {userData && userData.user.coins
              ? userData?.user?.coins
              : guestCoins
              ? guestCoins
              : "0"}
          </div>
        </div>
        {/* <div className="w-[150px] py-2 px-4 rounded-full border-2 flex  items-center justify-between">
          <div className="text-sm">Quiz Played</div>
          <div className="text-lg">
            {userData && userData.quizPlayed
              ? userData.quizPlayed.length
              : res
              ? res.length
              : "0"}
          </div>
        </div> */}
      </div>
      {subdomain !== "cricketz" && (
        <div
          className={
            userData?.user
              ? "text-red-600 w-full flex justify-center"
              : "bg-bg_join mx-3 py-3 px-14 font-black text-white rounded-full cursor-pointer"
          }
          onClick={() =>
            userData?.user ? logoutUserNow() : history.push("/login")
          }
        >
          {userData?.user ? (
            <button
              // onClick={logoutUserNow}
              type="button"
              className="border-2 border-red-500 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full hover:text-white text-sm px-5 py-2.5 w-48 text-center mr-2 mb-2 text-white"
            >
              LOG OUT
            </button>
          ) : (
            <div
            // onClick={() => {
            //     history.push("/login");
            // }}
            >
              Join Now
            </div>
          )}
        </div>
      )}
      <div className=" w-[480px]">
        <GoogleAds adSlot="profile" />
      </div>
    </div>
  );
};

export default Profile;
