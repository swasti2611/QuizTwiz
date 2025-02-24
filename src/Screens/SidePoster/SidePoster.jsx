import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const quizImg = "https://playerstorage.b-cdn.net/quiztwiz/assets/sidePoster.png";
// import scoreBoard from "https://playerstorage.b-cdn.net/quiztwiz/assets/background_quiz-min.jpg";
// import Body from "https://playerstorage.b-cdn.net/quiztwiz/assets/body.png";
// import QZ from "https://playerstorage.b-cdn.net/quiztwiz/assets/logo/logo2.png";
// import CH from "https://playerstorage.b-cdn.net/quiztwiz/assets/chrome.png";
import SideScore from "./SideScore";
import FootballPoster from "./FootballPoster";

const SidePoster = () => {
  let { cat } = useParams();
  const [side, setSide] = useState(false);
  const quizt20 = "6328091fddcbffed00e765e0";
  const checkQuiz = window.location.href.split("quiz/");
  const checkQuizId = checkQuiz[checkQuiz.length - 1];
  const handlepolicy = () => {
    window.location.href = "https://unibots.b-cdn.net/privacypolicy.txt";
  };
  let url = window.location.href.split("//")[1].split(".")[0];
  useEffect(() => {
    if (cat === "t20" || cat === "football" || quizt20 === checkQuizId) {
      setSide(true);
    } else {
      setSide(false);
    }
    return () => {
      // console.log("cleaned up");
    };
  }, [window.location.href]);
  return (
    <>
      {side ? (
        <>
          <div className="w-full md:hidden max-h-screen flex flex-col justify-center items-center gap-6 text-white border-[#e0e0e0]  object-cover bg-no-repeat bg-center h-screen">
            {cat === "t20" && <SideScore />}
            {cat === "football" && <FootballPoster />}
          </div>
        </>
      ) : (
        <div
          className="w-full relative md:hidden max-h-screen flex flex-col justify-center items-center gap-6 text-white border-[#e0e0e0] bg-gradient-to-r from-bg to-teal-900  object-cover bg-no-repeat bg-center h-screen"
          // style={{
          //     // backgroundImage: `url(${BackImg})`,
          //     background: "#009FFF" /* fallback for old browsers */,
          //     background:
          //         "-webkit-linear-gradient(to right, #ec2F4B, #009FFF)" /* Chrome 10-25, Safari 5.1-6 */,
          //     background:
          //         "linear-gradient(to right, #ec2F4B, #009FFF)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
          // }}
        >
          <img
            src={quizImg}
            className="w-[70%] lg:w-60 big:w-[45%] big:fixed big:z-[-1] big:top-10"
            alt="ERROR"
            loading="lazy"
          />
          {/* <img src={QZ} className="w-60 lg:w-48" alt="ERROR" /> */}
          <div className="font-bold lgm:text-sm lg:text-sm big:text-2xl big:fixed big:bottom-12  big:z-[-1]">
            {" "}
            Welcome to Quiztwiz. Play a quiz and earn coins.{" "}
            <p className="font-normal text-2xl pt-4 text-center">
              {" "}
              There's a quiz for everyone!{" "}
            </p>{" "}
          </div>

          {url === "defaultnew" && (
            <div className="flex gap-4 justify-center items-center w-[50%]">
              <p className="cursor-pointer" onClick={() => handlepolicy()}>
                Privacy Policy
              </p>
              <p className="cursor-pointer">
                <a
                  href="mailto:publisher@unibots.com"
                  className="text-center w-full"
                >
                  Contact Us: publisher@quiztwiz.com
                </a>
              </p>
            </div>
          )}
          {/* <div className="flex gap-1 items-center lg:text-[12px] lgm:text-[8px]">
                    For best experience, open{" "}
                    <span className="font-bold"> quiztwiz.com </span>{" "}
                    <img className="w-4 object-contain" src={CH} alt="ERROR" />{" "}
                    <span> Chrome mobile </span>{" "}
                </div> */}
        </div>
      )}
    </>
  );
};

export default SidePoster;
