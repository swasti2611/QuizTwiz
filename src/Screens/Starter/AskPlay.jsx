import React from "react";
import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";

import GoogleAds from "../../GoogleAds";
import SidePoster from "../SidePoster/SidePoster";
import showAds from "../../showAds";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCoins } from "../../API/Auth";
import { updateUserProfile } from "../../GlobalStorage/actions/userActions";

function AskPlay(props) {
  let dataCoins;
  const dispatch = useDispatch();
  if (props.location.state) {
    let { routeData } = props?.location?.state;
    // console.log("dat--a", routeData);
    dataCoins = { routeData };
    // console.log("location", routeData);
  } else {
    dataCoins = {};
  }

  const localCoinsJSON = sessionStorage.getItem("localCoins");
  // console.log("dataCoins", dataCoins);
  const localCoins = localCoinsJSON ? JSON.parse(localCoinsJSON) : { coins: 0 }; // Handle null or undefined
  const history = useHistory();
  const userData = useSelector((state) => state.userReducer);
  // console.log("localCoins", localCoins);
  // console.log("route data", dataCoins);
  const claimedPresent = sessionStorage.getItem("claimedCoins");

  let userCoins;
  if (claimedPresent) {
    userCoins = (dataCoins?.routeData?.claimedCoins ?? 0) + localCoins.coins; // Properly handle routeData.claimedCoins
    sessionStorage.setItem("localCoins", JSON.stringify({ coins: userCoins }));
    sessionStorage.removeItem("claimedCoins");
  } else {
    userCoins = localCoins.coins;
  }
  const goHome = async () => {
    if (userData.user) {
      let email = userData.user.email;
      let newCoins = userData.user.coins + userCoins;
      let result = await updateUserCoins(email, newCoins);
      dispatch(updateUserProfile(result.data.data));
      // console.log("updated coins", result);
    }
    // let from = "tohome";
    // showAds(from);
    history.push("/home");
  };


  const checkPlayQuizAds = () => {
    fetch("https://quiz-backend-6yad.onrender.com/check-ads-PLAY-BTN")
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
};

  return (
    <div className="text-white h-screen flex overflow-hidden overflow-y-auto scrollhide">
      <div className="min-w-[520px] max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center  box-border bg-bg">
        <div className="flex justify-center min-h-[320px] my-4">
          <div className="max-w-[450px] max-h-[320px] mobile-width">
            <GoogleAds adSlot="start_2_inpage" />
          </div>
        </div>

        <>
          <div className="flex flex-col gap-6 md:gap-2 bg-bg border-2 border-border rounded-[30px] px-[10px] py-5 mx-[10px]">
            <div className="flex gap-2 items-center px-5 ">
              <div className="flex justify-center flex-col w-full items-center">
                <div className="text-[10px] text-[#64d2ff] font-black sm:text-[8px]">
                  {" "}
                  QuizTwiz
                  {/* {data.title}{" "} */}
                </div>
                <div className="flex gap-1 text-[18px] font-black sm:text-[14px]">
                  You have won {userCoins ?? 0}
                  <img
                    className="w-[20px] object-contain"
                    src={Coin}
                    alt="Coin"
                  />{" "}
                  {/* {data.totalPrice} */}
                </div>
                {/* <div className='text-[12px] text-text sm:text-[10px]'> Winner announcement @ {currentData.announcement}</div> */}
              </div>
            </div>
            <div
              className="self-center border-text bg-[#1F01FF]   border-[1px] md:w-full text-text text-center rounded-full font-bold text-sm py-3 md:px-4 px-10 cursor-pointer"
              onClick={async (e) => {
                goHome(); // Calls goHome function
                await checkPlayQuizAds(); // Waits for checkPlayQuizAds to finish
            }}
              
            >
              PLAY QUIZ
            </div>

            <ul className="list-disc flex flex-col gap-3 px-9 text-sm text-text">
              <li>You've got 90 - 150 seconds to answer all questions</li>
              <li>Answer as many questions as you can</li>
              <li>
                For Every Correct answer you will get +50 points and will loose
                -25 points on every Incorrect answer
              </li>
              <li>
                You can take help by using the lifelines present in the contest.
              </li>

              <li>
                Lifelines can be used for free or by using a given amount of
                coins for each lifeline.
              </li>
            </ul>
            {/* <div className="h-[1px] bg-border"></div> */}
          </div>

          <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000] my-3"></div>
          {/* <div
                         style={{
                            height:"100%" 
                            // borderWidth: !show ? "0px" : null,
                        }}
                        className="flex flex-col border-[1px] border-border rounded-md text-[12px] relative  transition-all duration-1000 h-[0] overflow-hidden"
                    >
                        <div className="absolute w-[14px] h-[14px] border-l-[1px] border-t-[1px] border-border left-[40%] rotate-[45deg] top-[-8px] bg-[#272c52]"></div>

                        <div className="flex justify-between items-center ub_pseudo_background px-4 py-2">
                            <div>100% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 1,000 Coins</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center ub_pseudo_background py-2 px-4">
                            <div>90 - 100% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 750 coins </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center ub_pseudo_background py-2 px-4">
                            <div>75 - 90% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 500 coins </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center ub_pseudo_background py-2 px-4">
                            <div>50 - 75% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 200 coins</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ub_pseudo_background py-2 px-4">
                            <div> 25 - 50% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 100 coins </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ub_pseudo_background py-2 px-4">
                            <div>0 - 25% Points</div>
                            <div className="flex gap-1 items-center">
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={Coin}
                                    alt="ERROR"
                                />
                                <div> 25 coins </div>
                            </div>
                        </div>
                 </div> */}
        </>
      </div>
      <SidePoster />
    </div>
  );
}

export default AskPlay;
