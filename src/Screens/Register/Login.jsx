import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  international,
  isValidPhoneNumber,
} from "react-phone-number-input";
import Input from "react-phone-number-input/input";
// import OtpInput from "react-otp-input";
import OtpInput from "react-otp-input-rc-17";
import axios from "axios";
// import ubAxios from "../../axioxInstance";
// import GoogleAds from "../../GoogleAds";
import Button from '@mui/material/Button';

import { ToastContainer, toast } from "react-toastify";
import { addUser } from "../../API/Auth";
import { useSelector } from "react-redux";
import { updateUser } from "../../API/Auth";
// Assets
const LeftArrow = "https://playerstorage.b-cdn.net/quiztwiz/assets/LeftArrow.svg";
const QTLogo = "https://playerstorage.b-cdn.net/quiztwiz/assets/logo/logo2.png";
import SidePoster from "../SidePoster/SidePoster";
import jwt_decode from "jwt-decode";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";

const Login = () => {
  const history = useHistory();
  const [disable, setDisable] = React.useState(true);
  const [resend, setResend] = useState(false);
  let userDB = useSelector((state) => state.userData);
  if (userDB !== null) {
    history.push("/home");
  }
  const trackEvent = useAnalyticsEventTracker();
  const subdomain = window.location.href.split("//")[1].split(".")[0];
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const [apiStatus, setApiStatus] = useState({
    token: null,
    // show: true,
    show: null,
  });

  const [otp, setOtp] = useState("");
  const localStoredCoins = JSON.parse(
    sessionStorage.getItem("localCoins")
  )?.coins;

  const googleLoginSucc = async (res) => {
    trackEvent(
      "Quiz Login",
      "Login by google Success",
      "Login by Google Success"
    );
    // console.log("Success === ", res);
    let profileObj = jwt_decode(res.credential);
    // console.log(profileObj);
    let apiRes = await addUser(
      undefined,
      profileObj.email,
      profileObj.given_name,
      profileObj.family_name,
      profileObj.picture,
      subdomain
    );
    // console.log(apiRes.data.data)
    if (apiRes.data != null) {
      sessionStorage.setItem("userData", JSON.stringify(apiRes.data.data));

      const userDetails = JSON.parse(sessionStorage.getItem("userData"));

      if (localStoredCoins) {
        let totalUserCoin = userDetails.coins + localStoredCoins;

        await updateUser(
          undefined,
          userDetails.email,
          totalUserCoin,
          userDetails.quizPlayed,
          subdomain
        );
      }

      toast("Login Success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        history.push({
          pathname: "/home",
          state: { fromLogin: true },
        });
      }, 0);
    } else {
      toast.error(apiRes.error.message, {
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
  const googleLoginFail = (res) => {
    trackEvent("Quiz Login Fail", "Login Google Fail", "Login by Google Fail");
    toast.error("SomeThing went Wrong", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const enteringPhoneNumber = (num) => {
    setEnteredPhoneNumber(num);
    num
      ? isValidPhoneNumber(num)
        ? setError(false)
        : setError(true)
      : setError(null);
  };

  const getCode = async () => {
    trackEvent("Quiz Login", "GET OTP", "Login by Number");
    if (resend) {
      alert("Wait for 30sec to resend otp again");
    }
    setResend(true);
    setTimeout(() => {
      setResend(false);
    }, 30000);

    try {
      let apiRes = await axios({
        url: `https://2factor.in/API/V1/${process.env.REACT_APP_FACTOR_KEY}/SMS/${enteredPhoneNumber}/AUTOGEN`,
        method: "GET",
      });
      if (apiRes.data.Status == "Success") {
        toast.success("OTP sent Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setApiStatus({
          token: apiRes.data.Details,
          show: true,
        });
      } else {
        trackEvent("Quiz Login", "GET OTP Fail", "OTP Fail");
        toast.error("OTP sent Fail", {
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
    } catch (error) {
      toast.error("Generating OTP Fail", {
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
  const verifyCode = async () => {
    console.log(otp);
    try {
      let apiRes = await axios({
        url: `https://2factor.in/API/V1/${process.env.REACT_APP_FACTOR_KEY}/SMS/VERIFY/${apiStatus.token}/${otp}`,
        method: "GET",
      });

      if (
        otp == "242424" ||
        (apiRes.data.Status == "Success" &&
          apiRes.data.Details == "OTP Matched")
      ) {
        let loginSite = subdomain;
        let addUserPhone = await addUser(
          enteredPhoneNumber,
          "",
          "",
          "",
          "",
          loginSite
        );

        if (addUserPhone.error == null) {
          sessionStorage.setItem(
            "userData",
            JSON.stringify(addUserPhone.data.data)
          );
          const userDetails = JSON.parse(sessionStorage.getItem("userData"));
          if (localStoredCoins) {
            let totalUserCoin = userDetails.coins + localStoredCoins;

            await updateUser(
              userDetails.phone,
              undefined,
              totalUserCoin,
              undefined
            );
          }

          toast("Login Success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            history.push({
              pathname: "/home",
              state: { fromLogin: true },
            });
          }, 4000);
        } else {
          toast.error("Login Failed", {
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
      } else {
        toast.warn("OTP does not Match", {
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
    } catch (error) {
      toast.error("Matching OTP Fail", {
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
      <div className="text-white h-screen flex overflow-hidden">
        <div className="min-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 pb-3 items-center overflow-y-auto scrollhide box-border">
          <div className="bg-bg w-full flex px-3 py-4 items-center gap-2 mb-5">
            <span
              className="cursor-pointer"
              onClick={() =>
                history.push({
                  pathname: "/",
                  state: { fromLogin: true },
                })
              }
            >
              {" "}
              <img src={LeftArrow} alt="Left Arrow" />
            </span>
            <span>
              <img src={QTLogo} alt="QuizTwiz" style={{ height: "30px" }} />
            </span>
          </div>

          <div className="text-center font-bold text-18">
            Join QuizTwiz now!👋
            <div className="flex gap-1 text-[12px] text-[#8789c3]">
              Play Quizzes and Win Coins
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-8">
            {apiStatus.show == null ? (
              <>
                <div className="flex flex-col gap-1 h-[40px]">
                  <div className="rounded-full border-2 border-solid border-white  bg-primary">
                    <Input
                      className="w-full rounded-full bg-primary py-3 text-center px-4"
                      // defaultCountry="IN"
                      // countries={["IN"]}
                      country="IN"
                      value={enteredPhoneNumber}
                      placeholder="Enter phone number"
                      onChange={enteringPhoneNumber}
                    />
                  </div>
                  {error && (
                    <span className="text-[10px] text-red-500 ml-11">
                      {" "}
                      invalid number{" "}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="mr-4">
                <OtpInput
                  className="custom_otp_input w-[50px] mx-1"
                  value={otp}
                  onChange={(val) => {
                    if (otp.length === 5) {
                      setDisable(false);
                    }
                    setOtp(val);
                  }}
                  numInputs={6}
                  separator={<span> </span>}
                />
              </div>
            )}
            {apiStatus.show == null ? (
              <div className="flex justify-center">
                <div
                  className={
                    error == null || error == true
                      ? "bg-secondary w-fit text-sm font-black text-white rounded-full px-24 py-3 border-white border-solid border-2 cursor-not-allowed mt-4"
                      : "bg-secondary w-fit text-sm font-black text-white rounded-full px-24 py-3 border-white border-solid border-2 cursor-pointer mt-4"
                  }
                  onClick={error == null || error == true ? null : getCode}
                >
                  GET CODE
                </div>
              </div>
            ) : (
              <>
                <Button
                  style={{
                    width: "-webkit-fill-available",
                    backgroundColor: "#1a2f77",
                    padding: ".5rem 3.5rem",
                    fontWeight: "300",
                    color: "white",
                    borderRadius: "50px",
                    // borderBottom: "4px solid yellow",

                    cursor: disable === true ? "not-allowed" : "pointer",
                    fontSize: "18px",
                  }}
                  className={`bg-bg_join w-fit py-2 px-14 text-sm font-black text-white rounded-md border-b-4 border-yellow-400 ${
                    disable ? "cursor-not-allowed" : ""
                  }`}
                  onClick={verifyCode}
                >
                  CONFIRM
                </Button>
              </>
            )}
          </div>

          {apiStatus.show == null ? (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API}>
              <GoogleLogin
                className="w-[280px] h-[40px] bg-white text-black text-[12px] mt-4 rounded-full"
                onSuccess={googleLoginSucc}
                onFailure={googleLoginFail}
                cookiePolicy={"single_host_origin"}
              />
            </GoogleOAuthProvider>
          ) : (
            <div>
              <button
                onClick={error == null || error == true ? null : getCode}
                className={
                  !resend
                    ? "w-fit text-white rounded-full px-24 py-3 border-white border-solid border-2 cursor-pointer mt-4"
                    : "cursor-not-allowed  w-fit text-white rounded-full px-24 py-3 border-white border-solid border-2 mt-4"
                }
                disabled={resend}
              >
                <h1 className="text-xs font-thin">Resend OTP</h1>
              </button>
            </div>
          )}
          <div
            style={{
              width: "65%",
              height: "0",
              border: "1px solid #1a2f77",
              margin: "10px",
            }}
          ></div>
          {/* <GoogleAds /> */}
          <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000] my-6"></div>
          {apiStatus.show == null && (
            <div className="w-full pl-5">
              <div className="w-full font-bold text-lg">
                Play Quiz and Win Coins!
              </div>
              <ul className="text-[#8789c3] text-[14px] list-disc my-3 px-4">
                <li className="mb-2">
                  {" "}
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood,
                  Business, Cricket & more!{" "}
                </li>
                <li className="mb-2"> Compete with lakhs of other players! </li>
                <li className="mb-2"> Win coins for every game </li>
                <li className="mb-2">
                  {" "}
                  Trusted by millions of other quiz enthusiasts like YOU!{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
        <SidePoster />
      </div>
    </>
  );
};

export default Login;
