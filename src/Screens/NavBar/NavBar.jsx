import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
const QTLogo = "https://playerstorage.b-cdn.net/quiztwiz/assets/logo/logo2.png";
const rewardg = "https://playerstorage.b-cdn.net/quiztwiz/assets/rewardg.gif";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addUser, addCoins } from "../../GlobalStorage/actions/user";
import { getUser, updateUserCoins } from "../../API/Auth";
import { refreshUser } from "../../GlobalStorage/actions/refresh";
import { updateUserProfile } from "../../GlobalStorage/actions/userActions";
const NavBar = (props) => {
  const history = useHistory();
  const [userUpdated, setuserUpdated] = useState(false);
  let userData = useSelector((state) => state.userReducer);

  // console.log("from nav", userData.user);
  // console.log("-----FFFFFFFFF------- ", userData);
  // console.log(props.gameCredit)
  const dispatch = useDispatch();

  let guestCoins = JSON.parse(sessionStorage.getItem("localCoins"));
  let showCoins = guestCoins?.coins || 0;
  const [cookies, setCookie] = useCookies(["reward-ads"]);
  const [Usertoken] = useCookies(["token"]);
  const [Alert, setAlert] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [dailyCoinsReward, setDailyCoinReward] = useState(true);
  if (clicks >= 10) {
    setCookie("reward-ads", props.clicks, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  }

  // useEffect(() => {
  //   console.log("token in nav", Usertoken.token);
  //   if (Usertoken.token) {
  //     let headers = {
  //       headers: {
  //         Authorization: `Bearer ${Usertoken.token}`,
  //       },
  //     };
  //     const latestUser = async () => {
  //       let res = getUser(headers)
  //         .then((response) => {
  //           // Successfully received user data
  //           console.log("response-->", response);
  //           dispatch(updateUserProfile(response.data.data));
  //           setuserUpdated(true);
  //         })
  //         .catch((error) => {
  //           // Handle error (e.g., token expired)
  //           console.error("Error fetching user data:", error);
  //         });
  //     };
  //     latestUser();
  //   }
  // }, [Usertoken.token, dispatch, props]);

  const goHome = () => {
    console.log("go home clicked");
    props.setActiveTab("/home");
    history.push({
      pathname: "/home",
      state: { fromNav: true },
    });
  };

  //   console.log(props.clicks)
  const dailyreward = () => {
    // props.clickChange()
    setClicks((prev) => prev + 1);
    if (!cookies["reward-ads"]) {
      if (userData.user) {
        const newCoins = userData.user?.coins + 100;

        let adRewardFlag = true;
        let adWatch = false;
        // let adsActive = process.env.REACT_APP_ADS_ACTIVE === "true";

        // window.adConfig = function (o) {
        //     window.adsbygoogle.push(o);
        // };
        // window.adBreak = function (o) {
        //     window.adsbygoogle.push(o);
        // };

        window.adBreak({
          type: "reward",
          name: "dailyreward",
          beforeReward: (showAdFn) => {
            adRewardFlag = false;
            // console.log(adRewardFlag);
            showAdFn();
          },
          adDismissed: () => {
            console.log("addismissed before time");
            return;
          },
          adViewed: () => {
            // console.log("Ad Dismissed after time");
            adRewardFlag = true;
            adWatch = true;
          },
          adBreakDone: () => {
            // console.log("Ad Break Done", adRewardFlag);
            if (adRewardFlag && adWatch) {
              const updateUserCoins = async () => {
                let updatedCoins = await updateUserCoins(
                  userData.user?.email,
                  newCoins
                );
                dispatch(updateUserProfile(updatedCoins.data.data));
              };
              updateUserCoins();
              toast.success("100 Coins Rewarded", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setDailyCoinReward(false);
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
      } else {
        let adRewardFlag = true;
        let adWatch = false;
        // window.adConfig = function (o) {
        //     window.adsbygoogle.push(o);
        // };
        // window.adBreak = function (o) {
        //     window.adsbygoogle.push(o);
        // };

        window.adBreak({
          type: "reward",
          name: "dailyreward",
          beforeReward: (showAdFn) => {
            adRewardFlag = false;
            // console.log(adRewardFlag);
            showAdFn();
          },
          adDismissed: () => console.log("Ad Dismissed before time"),
          adViewed: () => {
            console.log("Ad Dismissed after time");
            adRewardFlag = true;
            adWatch = true;
          },
          adBreakDone: () => {
            if (adRewardFlag && adWatch) {
              let guest = { coins: showCoins + 100 };
              sessionStorage.setItem("localCoins", JSON.stringify(guest));
              toast.success("100 Coins Rewarded", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setDailyCoinReward(false);
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
      <div
        className="bg-bg z-10  flex px-1 py-2 items-center justify-between mb-5 fixed left-0 min-w-[520px] max-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full"
        style={{ boxShadow: "0px 15px 15px #111827" }}
      >
        <div className="flex items-center gap-2">
          <span className="px-3 cursor-pointer">
            <img
              src={QTLogo}
              alt="QuizTwiz"
              style={{ height: "30px" }}
              onClick={goHome}
            />
          </span>
        </div>

        <div className="flex items-center text-[12px]">
          {dailyCoinsReward && (
            <div
              className="flex text-center gap-1 items-center  rounded-full px-2  cursor-pointer"
              onClick={dailyreward}
            >
              <div className="flex item-center mb-2">
                <img
                  className="w-[25px] object-contain"
                  src={rewardg}
                  alt="animation"
                />
              </div>
              <div className="flex items-center text-white">Daily Reward</div>
            </div>
          )}
          <div className="flex gap-1 items-center bg-secondary px-4 py-1  mx-5 rounded-full">
            <img className="w-[15px] object-contain" src={Coin} alt="Coins" />
            <div className="flex gap-1 text-xs">
              <div className="font-bold text-[12px] text-white">
                {" "}
                {userData?.user && userData?.user?.coins
                  ? userData?.user.coins
                  : sessionStorage.getItem("localCoins") &&
                    sessionStorage.getItem("localCoins") != null
                  ? showCoins
                  : "0"}{" "}
              </div>
              <div className="text-[10px] text-text">COINS</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
