import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
// import { checkRank } from "../../API/Question";
import { toast, ToastContainer } from "react-toastify";
import { getCategories } from "../../../src/API/Question";
const Play = "https://playerstorage.b-cdn.net/quiztwiz/assets/play.svg";
const logo = "https://playerstorage.b-cdn.net/quiztwiz/assets/animation.gif";
import { updateUser, updateUserCoins } from "../../API/Auth";
import { useSelector, useDispatch } from "react-redux";
// import { addCoins, addUser } from "../../GlobalStorage/actions/user";
import { refreshUser } from "../../GlobalStorage/actions/refresh";
import GoogleAds from "../../GoogleAds";
import { useCookies } from "react-cookie";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";
import { updateUserProfile } from "../../GlobalStorage/actions/userActions";
const Card = (props) => {
  const history = useHistory();
  const goToGame = async (id) => {
    props.changeCategoryId(id);

    history.push(`/home/quizzes-for-category`);
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer"
        onClick={() => goToGame(props.id)}
      >
        <div className="flex gap-2 items-center px-2 justify-between">
          <div className="flex flex-col">
            <img
              className="object-cover w-20 rounded-full"
              src={props.data.img}
              alt="Category"
            />
          </div>
          <div className="flex flex-col w-full justify-start">
            <div className="flex text-[10px] text-text_hd font-black sm:text-[8px] flex-col items-end px-5 ">
              <div className="bg-bg px-1"> {props.data.name} </div>
            </div>
            <div className="flex items-end flex-col px-5">
              <div className="text-[12px] sm:text-[10px] font-black flex">
                Play & Win&nbsp;&nbsp;
                <img
                  className="w-[20px] object-contain"
                  src={Coin}
                  alt="Coins"
                />
                &nbsp;
                {props.data.totalPrice}
              </div>
            </div>
            <div className="flex px-5 items-end flex-col">
              <span className="text-[10px] flex gap-1 sm:text-[8px]">
                Entry Fee &nbsp;
                <img className="w-[14px] object-contain" src={Coin} alt="Fee" />
                &nbsp;
                {props.data.entryFee}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <img
              src={Play}
              alt="Play"
              className="rounded-full object-cover w-20"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Result = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const trackEvent = useAnalyticsEventTracker();
  // let location = useLocation();
  let userDB = useSelector((state) => state.userReducer);
  let totalCoins = props.gameCredit + userDB?.user?.coins;
  // let quizData = location?.state?.quizData;
  // let userData = JSON.parse(sessionStorage.getItem("userData"));
  const [allQuizzes, setAllQuizzes] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  // console.log(userDB);
  let guestCoins = JSON.parse(sessionStorage.getItem("localCoins"))?.coins;
  let totalGuestCoins = props.gameCredit + guestCoins;
  const [cookies, setCookie] = useCookies(["reward-ads"]);
  const [clicks, setClicks] = useState(0);

  let storeCoins = async () => {
    let updatedUser = await updateUserCoins(userDB?.user.email, totalCoins);
    // console.log("result updated coin", updatedUser, totalCoins);
    // dispatch(updateUserProfile(updatedUser));
  };
  useEffect(() => {
    storeCoins();
  }, []);
  useEffect(() => {
    const catFetch = async () => {
      let res = await getCategories();
      if (res.error) {
        toast.error(res.error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setAllQuizzes(res.data.data.slice(0, 2));
      }
    };
    catFetch();
  }, []);

  // console.log(totalCoins);
  // const updatedCoin = async () => {
  //     // if (userDB) {
  //     //     let updatedUser = await updateUser(
  //     //         undefined,
  //     //         userDB.email,
  //     //         totalCoins
  //     //     ).then(response => console.log(response))

  //     //     console.log("after auth page")
  //     //     // dispatch(addCoins({...updatedUser, coins: totalCoins }));
  //     //     // dispatch(refreshUser());
  //     // }
  // };

  // let getRank = async () => {
  //     let res = await checkRank(userData?._id);
  //     if (res.error == null) {
  //         setCurrentRank(res.data.rank);
  //     }
  // };
  const saveQuizDataInLS = (score, credits) => {
    var toSaveObj = {
      quizID: props.quizId,
      score: score,
      credits: credits,
    };
    // console.log(toSaveObj);

    // updatedCoin();
    sessionStorage.setItem("quizData", JSON.stringify(toSaveObj));
  };

  useEffect(() => {
    // getRank();
    saveQuizDataInLS(props.score, props.gameCredit);
  }, []);

  const goToGame = async (id) => {
    props.changeCategoryId(id);
    const checkUser = JSON.parse(sessionStorage.getItem("userData"));

    if (checkUser) {
      if (userDB.user || checkUser) {
        let updatedUser = await updateUserCoins(userDB?.user.email, totalCoins);
        // console.log(updatedUser)
        dispatch(updateUserProfile(updatedUser));
      }
      history.push(`/home/quizzes-for-category`);
    } else {
      sessionStorage.setItem(
        "localCoins",
        JSON.stringify({ coins: totalGuestCoins })
      );
      history.push(`/home/quizzes-for-category`);
      dispatch(refreshUser());
    }
  };
  if (clicks >= 10) {
    setCookie("reward-ads", props.clicks, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 500),
    });
  }
  const earnMore = () => {
    // props.clickChange()
    setClicks((prev) => prev + 1);
    if (!cookies["reward-ads"]) {
      console.log("entered in reward");
      if (userDB) {
        const newCoins = totalCoins + props.gameCredit;
        console.log(newCoins);
        let adRewardFlag = true;
        // let adsActive = process.env.REACT_APP_ADS_ACTIVE === "true";
        let adsActive = true;
        let adWatch = false;
        if (adsActive) {
          console.log("entered userdb reward");
          window.adBreak = function (o) {
            window.adsbygoogle.push(o);
          };
          window.adConfig = function (o) {
            window.adsbygoogle.push(o);
          };

          window.adBreak({
            type: "reward",
            name: "earnreward",
            beforeReward: (showAdFn) => {
              adRewardFlag = false;
              // console.log(adRewardFlag);
              showAdFn();
            },
            adDismissed: () => console.log("Ad Dismissed before time"),
            adViewed: () => {
              // console.log("Ad Dismissed after time");
              adRewardFlag = true;
              adWatch = true;
            },
            adBreakDone: () => {
              // console.log("Ad Break Done", adRewardFlag);
              if (adRewardFlag && adWatch) {
                storeCoins();
                toast.success("2X Coins Rewarded", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                history.push(`/home`);
                dispatch(refreshUser());
              } else if (adRewardFlag) {
                toast.error("RewardAds not available, Try Again", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            },
          });
        }
      } else {
        let adRewardFlag = true;
        let adWatch = false;
        let adsActive = true;
        if (adsActive) {
          window.adConfig = function (o) {
            window.adsbygoogle.push(o);
          };

          window.adBreak = function (o) {
            window.adsbygoogle.push(o);
          };

          window.adBreak({
            type: "reward",
            name: "earnreward",
            beforeReward: (showAdFn) => {
              adRewardFlag = false;

              showAdFn();
            },
            adDismissed: () => console.log("Ad Dismissed before time"),
            adViewed: () => {
              // console.log("Ad Dismissed after time");
              adRewardFlag = true;
              adWatch = true;
            },
            adBreakDone: () => {
              // console.log("Ad Break Done", adRewardFlag);
              if (adRewardFlag && adWatch) {
                let guest = {
                  coins: props.gameCredit * 2 + guestCoins,
                };
                sessionStorage.setItem("localCoins", JSON.stringify(guest));
                toast.success("2X Coins Rewarded", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                history.push(`/home`);
                dispatch(refreshUser());
              } else if (adRewardFlag) {
                toast.error("RewardAds not available, Try Again", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            },
          });
        }
      }
    } else {
      toast.error("Daily reward Limit reached", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const updatedHome = async () => {
    const checkUser = JSON.parse(sessionStorage.getItem("userData"));
    trackEvent("Quiz Home", "Play Again", "Result to Home page");
    if (userDB.user) {
      let updatedUser = await updateUserCoins(
        userDB?.user.email,
        totalCoins
      ).then((response) => console.log(""));

      // history.push(`/home`);
      history.push({
        pathname: "/home",
        state: { fromResult: true },
      });
      dispatch(refreshUser());
    } else {
      sessionStorage.setItem(
        "localCoins",
        JSON.stringify({ coins: totalGuestCoins })
      );
      history.push({
        pathname: "/home",
        state: { fromResult: true },
      });
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

      <>
        <div className="flex gap-2 items-center px-5 flex-col">
          <div className=" max-w-[450px] max-h-[320px] mobile-width">
            <GoogleAds adSlot="endscreen_inpage" />
          </div>
          <div
            style={{ position: "relative", width: "200px" }}
            className="flex justify-center items-center"
          >
            <img
              src={logo}
              alt="logo"
              style={{
                height: "200px",

                position: "absolute",
                top: "-10px",
                // border:"2px solid red"
              }}
            />
            <h1 className="text-white text-4xl">Well Played</h1>
          </div>
          <div
            className="flex justify-evenly mt-20 gap-2"
            style={{ width: "100%" }}
          >
            <div
              className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer w-48"
              style={{ background: "#0e1344" }}
            >
              <div className="text-white text-center flex flex-col ">
                <span>{props.score ? props.score : "0"}</span>
                <span> Your Score</span>
              </div>
            </div>
            <div
              className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer w-48"
              style={{ background: "#0e1344" }}
            >
              <div className="text-white text-center flex flex-col ">
                <span>{props.gameCredit}</span>
                <span> Coins Earned</span>
              </div>
            </div>
            {currentRank && (
              <div
                className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer w-48"
                style={{ background: "#0e1344" }}
              >
                <div className="text-white text-center flex flex-col ">
                  <span>{currentRank}</span>
                  <span> Current Rank</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 cursor-pointer" onClick={earnMore}>
            <button className=" flex gap-2 rounded-full px-7 py-2 border-2 border-[#1a2f77]">
              Double Your winnings
              <img src={Coin} alt="coin" />
            </button>
          </div>
          <div
            style={{
              display: "block",
              height: "1px",
              border: 0,
              borderTop: "1px solid #1a2f77",
              margin: "1em 0",
              padding: 0,
              width: "100%",
            }}
          ></div>

          <div
            className="flex flex-col justify-between"
            style={{ height: "90px" }}
          >
            <button
              onClick={updatedHome}
              className="rounded-full px-7 py-2"
              style={{ background: "#1a2f77" }}
            >
              Home
            </button>

            {/* <span className="text-lg ">Play More Quizzes</span> */}
          </div>
          {/* <div className="flex flex-col">
                        {allQuizzes &&
                            allQuizzes.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="m-2"
                                        onClick={() => goToGame(props.id)}
                                    >
                                        {
                                            <Card
                                                changeCategoryId={
                                                    props.changeCategoryId
                                                }
                                                data={data}
                                                id={data._id}
                                            />
                                        }
                                    </div>
                                );
                            })}
                    </div> */}
        </div>
      </>
    </>
  );
};

export default Result;
