import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
import SidePoster from "../SidePoster/SidePoster";

import GoogleAds from "../../GoogleAds";
import { ClientID } from "../../GlobalStorage/actions/client";
import { CheckComponent } from "../../LoadContext";
import { sendData } from "../../API/Question";
import Login from "../Register/Login";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";

function Question2() {
  const location = useLocation();
  const count = location.state.count;
  const questions = location.state.data;
  const data = location.state.data[count];
  const prevCorrect = location.state.correct;

  let correctCount = 0;
  const history = useHistory();
  const [ans, setAns] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [wrong, setWrong] = useState(null);

  const next = (key) => {
    let result = null;
    if (key == data.correct) {
      setCorrect(data.correct);
      // setCorrectCount((prev) => prev + 1);
      correctCount++;
      result = true;
    } else {
      setCorrect(data.correct);
      setWrong(key);
      result = false;
    }
    // console.log("count", count);
    setTimeout(() => {
      setAns(result);
      let routeData = {
        data: questions,
        count: count + 1,
        correct: correctCount + prevCorrect,
      };

      history.push(`/question/2`, routeData);

      // if (count < questions.length - 1) {

      // } else {
      //   // console.log("prevcorrect", prevCorrect);
      //   let guestCoins = { coins: prevCorrect * 50 };
      //   sessionStorage.setItem("localCoins", JSON.stringify(guestCoins));
      //   history.push("/home");
      // }
    }, 1000);
  };

  const LoginEvent = () => {
    history.push("/login");
  };

  return (
    <>
      {data && (
        <>
          {/* <AdContainerComponent /> */}
          {/* <AdContainer2 /> */}
          <div className="text-white h-screen flex overflow-hidden">
            <div className="max-w-[520px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 py-3 px-2 items-center overflow-y-auto scrollhide box-border">
              <div className=" max-w-[450px] max-h-[320px] mobile-width">
                <GoogleAds />
              </div>
              <div className="text-center font-bold text-18">
                Let's begin!
                <div className="flex gap-1 text-[12px] text-[#8789c3]">
                  Answer 3 questions and win
                  <img className="w-3 object-contain" src={Coin} alt="coins" />
                  150 free!
                </div>
              </div>
              <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000]"></div>
              <div className=" text-[#bac8ff] font-bold">
                Question {count + 1}
                {/* <span className="text-[13px]">/{qData?.length}</span> */}
              </div>
              <div className="text-lg font-bold px-10 text-center">
                <span>{data?.question}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 px-3 min-w-full mt-4">
                {data.answers.map((data, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: correct
                          ? correct == data
                            ? "green"
                            : wrong
                            ? wrong == data
                              ? "red"
                              : null
                            : null
                          : null,
                        borderColor: correct
                          ? correct == data
                            ? "green"
                            : wrong
                            ? wrong == data
                              ? "red"
                              : null
                            : null
                          : null,
                      }}
                      className="flex flex-col justify-center items-center text-[14px] py-2 min-h-[32px] bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer"
                      onClick={() => next(data)}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              {/* {subdomain !== "soaps" && (
                <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000]"></div>
              )} */}
              {/* {subdomain === "soaps" && <div id="div-ub-soaps"></div>} */}
              <div
                className="text-[#ffcc5b] font-bold cursor-pointer"
                onClick={() => LoginEvent()}
              >
                Sign-Up - Login
              </div>
              {/* <div>
                {cat === "t20" && onMobile && (
                  <p
                    className="bg-blue-500 py-2 px-4 rounded-lg"
                    onClick={() => history.push(`/scorecard`)}
                  >
                    See Scorecard
                  </p>
                )}
              </div> */}
              <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000]"></div>
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
                  <li className="mb-2">
                    {" "}
                    Compete with lakhs of other players!{" "}
                  </li>
                  <li className="mb-2"> Win coins for every game </li>
                  <li className="mb-2">
                    {" "}
                    Trusted by millions of other quiz enthusiasts like YOU!{" "}
                  </li>
                </ul>
              </div>
              <div className="border-2 w-[100%] p-6 rounded-xl bg-white bg-opacity-10">
                <div>
                  <h1 className="text-2xl text-center text-blue-500">
                    Fun Facts
                  </h1>
                </div>
                <p>
                  The word "mortgage" comes from the Old French words "mort
                  gaige", which literally means "dead pledge". This is because
                  when a mortgage is paid off, the loan "dies". . The average
                  monthly mortgage payment in the United States is $1,297. This
                  includes principal, interest, taxes, and insurance.The most
                  popular type of mortgage in the United States is the 30-year
                  fixed-rate mortgage. The total amount of mortgage debt in the
                  United States is over $10 trillion. This makes mortgages the
                  largest source of debt in the country.
                </p>
              </div>
            </div>
            <SidePoster />
          </div>
        </>
      )}
    </>
  );
}

export default Question2;
