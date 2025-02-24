import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
const afterReward = "https://playerstorage.b-cdn.net/quiztwiz/assets/rewarded.gif";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
// import CardData from "https://playerstorage.b-cdn.net/quiztwiz/assets/CardData";
// const Play = "https://playerstorage.b-cdn.net/quiztwiz/assets/play.svg";
import { toast, ToastContainer } from "react-toastify";
import { updateUser, updateUserCoins } from "../../../API/Auth";
// import { getUser } from "../../../API/Auth";
import { cutFee, getQuizzes } from "../../../API/Question";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../../../GlobalStorage/actions/refresh";
// import { updateUser } from "../../API/Auth";
import GoogleAds from "../../../GoogleAds";
// import { ClientID } from "../../../GlobalStorage/actions/client";
import useAnalyticsEventTracker from "../../../useAnalyticsEventTracker";
import GetCoin from "./GetCoin";
import { updateUserProfile } from "../../../GlobalStorage/actions/userActions";
function QuizPlay(props) {
  // console.log(props)
  const trackEvent = useAnalyticsEventTracker();
  const history = useHistory();
  const params = useParams();
  let userDB = useSelector((state) => state.userReducer);

  let dispatch = useDispatch();
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let newCoins = userDB?.coins - 100;
  const [show, setShow] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adViewedComplete, setAdViewedComplete] = useState(false);
  let guestCoins = JSON.parse(sessionStorage.getItem("localCoins"))?.coins ?? 0;

  let clientid = useSelector((state) => state.clientId);
  let subdomain = window.location.href.split("//")[1].split(".")[0];

  // console.log(newCoins)
  let user = JSON.parse(sessionStorage.getItem("userData"));
  //     console.log(user)
  //   console.log(userDB)
  const closeModal = () => {
    setIsModalOpen(false);

    // console.log("routeData--", routeData);
  };
  const startQuiz = async (index) => {
    if (userDB.user !== null) {
      let userCoinsDb = Number(userDB.user.coins) - 100;

      let res = await updateUserCoins(userDB.user.email, userCoinsDb);

      dispatch(updateUserProfile(res.data.data));
    }
    trackEvent("button", "Start Quiz as Guest", "Start Quiz Guest");
    // check quiz played
    let guestCoins =
      JSON.parse(sessionStorage.getItem("localCoins"))?.coins ?? 0;

    if (userDB.user || user) {
      for (let i = 0; i < userDB?.quizPlayed?.length; i++) {
        // console.log(quizPlayed)
        // console.log(userDB.quizPlayed[i])
        // console.log(userDB.quizPlayed.length)
        if (quizPlayed == userDB.quizPlayed[i]) {
          // console.log("cannot play this quis")
          toast.warn("Cannot Play same quiz again", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
      }
      // if(user.quizPlayed.includes(quizPlayed)){
      //     console.log("cannot play this quis")
      //     alert("cannot play same quiz Twice")
      //     return
      // }
      // console.log(userDB?.phone,userDB.email, newCoins, quizPlayed)

      // let updatedCoin = await updateUser(
      //   userDB?.phone,
      //   userDB?.email,
      //   newCoins,
      //   quizPlayed
      // );
    } else {
      let getLocal = JSON.parse(sessionStorage.getItem("localQuiz"));
      // let localCoins = JSON.parse(sessionStorage.getItem("localCoins"));
      // console.log(localCoins);
      if (guestCoins < -500) {
        toast.warn(
          "Not sufficient coins to play this Quiz.Login to play more and earn coins",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setTimeout(() => {
          history.push("/login");
        }, 4000);
        return;
      } else {
        sessionStorage.setItem(
          "localCoins",
          JSON.stringify({ coins: guestCoins - 100 })
        );
      }
      if (getLocal) {
        for (let i = 0; i < getLocal.length; i++) {
          if (quizPlayed == getLocal[i]) {
            toast.warn("Cannot Play same quiz again", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
        }
        const localplayed = [...getLocal, quizPlayed];
        sessionStorage.setItem("localQuiz", JSON.stringify(localplayed));
        // console.log(localplayed);
      } else {
        // console.log(quizPlayed);
        if (quizPlayed !== "6328091fddcbffed00e765e0") {
          const localplayed = [quizPlayed];
          sessionStorage.setItem("localQuiz", JSON.stringify(localplayed));
        }
        // console.log(localplayed)
      }
    }

    // if (res.error) {
    //     // sessionStorage.clear()
    //     // history.push("/")
    //     // toast.warn("Unauthorized", {
    //     //     position: "top-right",
    //     //     autoClose: 3000,
    //     //     hideProgressBar: false,
    //     //     closeOnClick: true,
    //     //     pauseOnHover: true,
    //     //     draggable: true,
    //     //     progress: undefined,
    //     //     theme: "dark",
    //     // });
    // } else {
    // }
    // console.log(res);
    // history.push({
    //     pathname: `/home/quiz/{quizPlayed}`,
    //     state: { quizID: currentData[index]?._id },
    // });
    history.push({
      pathname: `/home/quiz/${quizPlayed}`,
      state: { activeData },
    });

    dispatch(refreshUser());
  };
  const CustomToast = ({ message, image }) => (
    <div className="flex justify-center items-center">
      <img src={image} alt="Notification" style={{ width: "100px" }} />
      <p>{message}</p>
    </div>
  );
  const handleShowToast = () => {
    const image = afterReward;
    const message = "100 coins Rewarded!!";

    toast(<CustomToast message={message} image={image} />, {
      autoClose: 1000, // Set the closing time to 5000 milliseconds (5 seconds)
    });
  };
  const handleClaim = () => {
    let adRewardFlag = true;
    let adsActive = true;
    let adWatch = false;
    if (adsActive) {
      // window.adConfig = function (o) {
      //   window.adsbygoogle.push(o);
      // };
      // window.adBreak = function (o) {
      //   window.adsbygoogle.push(o);
      // };
      if (typeof window.adBreak === "function") {
        console.log("window adbrreak present");
      } else {
        window.adBreak = function (o) {
          window.adsbygoogle.push(o);
        };
      }
      window.adBreak({
        type: "reward",
        name: "coins",
        beforeReward: (showAdFn) => {
          adRewardFlag = false;
          // console.log(adRewardFlag);
          showAdFn();
        },
        adDismissed: () => {
          console.log("Ad Dismissed before time");
        },

        adViewed: () => {
          console.log("Ad Dismissed after time");
          adRewardFlag = true;
          adWatch = true;

          showModal();
        },

        adBreakDone: () => {
          if (adRewardFlag && adWatch) {
            console.log("inside rewatd toast");
            // toast.success("500 Coins Rewarded", {
            //   position: "top-right",
            //   autoClose: 3000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "dark",
            // });
            handleShowToast();
            guestCoins = sessionStorage.getItem("");
            setTimeout(() => {
              sessionStorage.setItem("claimedCoins", JSON.stringify(500));
              let localCoins = sessionStorage.getItem("localCoins");

              // Check if "localCoins" is null or undefined
              if (localCoins === null || localCoins === undefined) {
                localCoins = { coins: 0 }; // Initialize it as an object with coins set to 0
              } else {
                // Parse the JSON string into an object
                localCoins = JSON.parse(localCoins);
              }

              // Update the "coins" property of localCoins and save it back to sessionStorage
              localCoins.coins = (localCoins.coins || 0) + 100;

              // Store the updated localCoins object back in sessionStorage
              sessionStorage.setItem("localCoins", JSON.stringify(localCoins));

              // console.log("local coins", localCoins.coins);
              startQuiz();
            }, 1500);
            // dispatch(refreshUser());
          } else if (adRewardFlag) {
            toast.error("RewardAds not available, Try Again", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            setTimeout(() => {
              // history.push(`/question/1`, routeData);
              startQuiz();
            }, 1500);
          }
          setIsModalOpen(false);
        },
      });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
    setAdViewedComplete(true);
  };
  const urlPath = window.location.href;
  const currentPath = urlPath.split("/");
  let lastUrl = currentPath[currentPath.length - 1];
  lastUrl = lastUrl?.replaceAll("%20", " ");
  // console.log(lastUrl)

  let quizPlayed = "";
  if (currentData.length > 0) {
    for (let i = 0; i < currentData.length; i++) {
      if (lastUrl === currentData[i].title) {
        quizPlayed = currentData[i]._id;
      }
    }
  }

  useEffect(() => {
    const getCurrentData = async () => {
      let res = await getQuizzes(props.categoryId);
      // if (res.error) {
      //     toast.error(res.error.message, {
      //         position: "top-right",
      //         autoClose: 3000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "dark",
      //     });
      // } else {
      // }

      setCurrentData(res?.data?.data);
      setLoading(false);
    };
    getCurrentData();
  }, []);

  const joinNow = () => {
    trackEvent("button", "Login clicked to play quiz", "Join Now");
    history.push("/signup");
  };
  if (currentData.length && render) {
    let activeCat = [];
    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].title === params.title) {
        activeCat.push(currentData[i]);
      }
    }

    if (activeCat.length) {
      setActiveData(activeCat);
      setRender(false);
    }
  }
  // console.log(activeData)
  const rewardModal = () => {
    console.log("userdb",userDB.user);
    console.log("userDB", userDB?.user?.coins > 50);
    if (userDB?.user && userDB?.user?.coins > 50) {
      startQuiz();
    } else if (userDB?.user === null && guestCoins >= 100) {
      startQuiz();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <GetCoin
        isOpen={isModalOpen}
        onClose={closeModal}
        onClaim={handleClaim}
        adViewedComplete={adViewedComplete}
      />
      <div className="flex justify-center min-h-[320px]">
        <div className="max-w-[450px] max-h-[320px] mobile-width">
          <GoogleAds clientid={clientid} adSlot="home_inpage" />
        </div>
      </div>
      {loading && (
        <div className="flex w-full h-screen justify-center items-center">
          <h1>Data is Loading....</h1>
        </div>
      )}
      {activeData.length !== 0 ? (
        <>
          {activeData.map((data, index) => {
            return (
              <div
                className="flex flex-col gap-6 md:gap-2 bg-bg border-2 border-border rounded-[30px] py-5"
                key={index}
              >
                <div className="flex gap-2 items-center px-5 ">
                  <img
                    className="w-[60px] object-cover sm:w-[58px] rounded-full"
                    src={data?.image || data?.img}
                    alt="category"
                  />
                  <div>
                    <div className="text-[10px] text-[#64d2ff] font-black sm:text-[8px]">
                      {" "}
                      {data.title}{" "}
                    </div>
                    <div className="flex gap-1 text-[18px] font-black sm:text-[14px]">
                      Play & Win{" "}
                      <img
                        className="w-[20px] object-contain"
                        src={Coin}
                        alt="Coin"
                      />{" "}
                      {data.totalPrice}
                    </div>
                    {/* <div className='text-[12px] text-text sm:text-[10px]'> Winner announcement @ {currentData.announcement}</div> */}
                  </div>
                </div>
                {!sessionStorage.getItem("userData") ? (
                  <div className="flex md:flex-col items-center justify-around m-2">
                    {subdomain !== "cricketz" && !userDB.user ? (
                      <>
                        <div className="md:w-[100%] order-none md:order-last">
                          <button
                            className="bg-secondary py-2 md:py-2 px-14 md:px-7 md:w-full font-black text-white rounded-full"
                            onClick={() => joinNow()}
                          >
                            JOIN NOW
                          </button>
                        </div>

                        <div className="text-[20px] order-none md:order-2">
                          or
                        </div>
                        <div
                          className="self-center border-text md:order-1  border-[1px] md:w-full text-text text-center rounded-full font-bold text-sm py-3 md:px-4 px-10 cursor-pointer"
                          onClick={(e) => rewardModal(index)}
                        >
                          {subdomain !== "cricketz" && userDB.user
                            ? "PLAY"
                            : "PLAY AS GUEST"}
                        </div>
                      </>
                    ) : (
                      <div
                        className="self-center border-text md:order-1  border-[1px] md:w-full text-text text-center rounded-full font-bold text-sm py-3 md:px-4 px-10 cursor-pointer"
                        onClick={(e) => rewardModal(index)}
                      >
                        {subdomain !== "cricketz" || userDB.user
                          ? "PLAY"
                          : "PLAY AS GUEST"}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="bg-primary hover:bg-secondary mx-3 py-3 px-14 border-white border border-solid font-black text-white rounded-full"
                    onClick={(e) => rewardModal(index)}
                  >
                    PLAY NOW
                  </button>
                )}
                <ul className="list-disc flex flex-col gap-3 px-9 text-sm text-text">
                  <li>You've got 90 - 150 seconds to answer all questions</li>
                  <li>Answer as many questions as you can</li>
                  <li>
                    For Every Correct answer you will get +50 points and will
                    loose -25 points on every Incorrect answer
                  </li>
                  <li>
                    You can take help by using the lifelines present in the
                    contest.
                  </li>

                  <li>
                    Lifelines can be used for free or by using a given amount of
                    coins for each lifeline.
                  </li>
                </ul>
                {/* <div className="h-[1px] bg-border"></div> */}
              </div>
            );
          })}

          <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000] my-3"></div>
          <div
            className="flex gap-2 items-center justify-center text-text_yellow cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {/* <span>  Rewards </span>
                        <span className="h-[2px] w-[2px] bg-text_yellow ">
                            {" "}
                        </span> */}
            {/* <span> Rules </span> */}
          </div>

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
      ) : (
        <h1>Questions not available. Refresh the page</h1>
      )}
    </>
  );
}

export default QuizPlay;
