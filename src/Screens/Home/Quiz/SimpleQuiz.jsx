import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector } from "react-redux";
import { getQuestions } from "../../../API/Question";
import { toast, ToastContainer } from "react-toastify";

// const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
// import CardData from "https://playerstorage.b-cdn.net/quiztwiz/assets/CardData";
const Audience = "https://playerstorage.b-cdn.net/quiztwiz/assets/audience.svg";
const Freez = "https://playerstorage.b-cdn.net/quiztwiz/assets/freez.svg";
const Flip = "https://playerstorage.b-cdn.net/quiztwiz/assets/flip.svg";
const working = "https://playerstorage.b-cdn.net/quiztwiz/assets/working.png";
const loadinggif = "https://playerstorage.b-cdn.net/quiztwiz/assets/loadingani.gif";
// import { textFieldClasses } from "@mui/material";
import useAnalyticsEventTracker from "../../../useAnalyticsEventTracker";
import GoogleAds from "../../../GoogleAds";
const SimpleQuiz = (props) => {
  const trackEvent = useAnalyticsEventTracker();
  const history = useHistory();
  const location = useLocation();
  let userData = useSelector((state) => state.userData);

  const [qData, setQData] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [teamScore, setTeamScore] = useState(null);
  const quizt20 = "6328091fddcbffed00e765e0";
  const checkQuiz = window.location.href.split("quiz/");
  // console.log(checkQuiz);
  // console.log(checkQuiz.length);
  const checkQuizId = checkQuiz[checkQuiz.length - 1];
  useEffect(() => {
    let cancel = false;
    if (quizt20 === checkQuizId) {
      let matchdata;
      if (!cancel) {
        const getScore = async () => {
          const score = await fetch("https://cricket.unibots.in/get_score");
          const res = await score.json();

          for (let i = 0; i < res.data.length; i++) {
            let scoredetails = res.data[i][0];
            // console.log(res.data[i][0]);
            if (scoredetails) {
              if (scoredetails.matchStatus === "COMPLETED") {
                let str = `Match Completed || ${scoredetails.title} ${scoredetails.summaryText}`;
                setTeamScore(str);
              } else if (scoredetails.matchStatus === "INPROGRESS") {
              } else if (scoredetails.matchStatus === "UPCOMING") {
              }
            }
          }
        };
        getScore();
      }
    }
    return () => {
      cancel = true;
    };
  }, []);

  // console.log(data)
  let time = 120;
  const [timeProgress, setTimeProgress] = useState(time);
  const [isQuizComplete, setQuizComplete] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [lifeLinesUsed, setLifeLinesUsed] = useState({
    fifty: false,
    poll: false,
    freeze: false,
    flip: false,
  });
  // console.log(correct);
  const [lifeFiftyState, setLifeFiftyState] = useState([
    true,
    true,
    true,
    true,
  ]);

  const [lifePollState, setLifePollState] = useState([0, 0, 0, 0]);
  const [lifePollShow, setLifePollShow] = useState(false);
  const [lifeFreeze, setLifeFreeze] = useState(false);
  const [green, setGreen] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const freezeRef = useRef(lifeFreeze);
  freezeRef.current = lifeFreeze;
  const params = useParams();
  const [show, setShow] = useState(false);

  const next = (key) => {
    let result = null;
    setLifePollShow(false);

    if (key == data.correct) {
      setCorrect(data.correct);
      result = true;
      setGreen(true);
    } else {
      setCorrect(data.correct);
      setWrong(key);
      setGreen(false);
      result = false;
    }
    setTimeout(() => {
      setAns(result);
      setGreen(null);
    }, 1000);
  };

  useEffect(() => {
    let cancel = false;
    if (!cancel) {
      const pullQuestions = async () => {
        let res;
        res = await getQuestions(userData?._id, params.id, null);
        // console.log(res);
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
          const randomQuestions = res.data.data.sort(() => 0.5 - Math.random());
          // console.log(randomQuestions);
          const selected = randomQuestions.slice(0, 15);
          setQData(selected);
          setLoading(false);
        }
      };
      pullQuestions();
    }
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    setData(qData[count]);
    setLifeFiftyState([true, true, true, true]);
    setLifeFreeze(false);
  }, [count, qData]);

  useEffect(() => {
    if (ans != null) {
      if (ans == true) {
        setCorrectCount((prev) => prev + 1);
      } else if (ans == false) {
        setIncorrectCount((prev) => prev - 1);
      }
      if (qData.length <= count + 1) {
        trackEvent("button", "Quiz Complete Played", "Quiz Complete Played");
        setQuizComplete(true);
      } else {
        setCount(count + 1);
      }
    }
    setCorrect(null);
    setWrong(null);
    setAns(null);
  }, [ans]);
  // console.log(timeProgress)
  useEffect(() => {
    if (isQuizComplete || timeProgress === 1) {
      props.setScoreValue(correctCount * 50 - incorrectCount * -25);
      let credits = calculateCoins(correctCount * 50 - incorrectCount * -25);
      props.setGameCreditValue(credits);
      props.setQuizId(location?.state?.quizID);
      trackEvent("Quiz", "Time Over", "Quiz Time Completed");
      history.push("/home/Result");
    }
  }, [isQuizComplete, timeProgress]);

  const [progress, setProgress] = React.useState(100);

  const randomIntFromInterval = (min, max) => {
    let output = Math.floor(Math.random() * (max - min + 1) + min);
    return output;
  };
  const calculateCoins = (score) => {
    let credits = 0;
    let maxScore = qData.length * 50;
    let quizPrice = location.state.activeData[0].totalPrice;
    // console.log(score);
    let slab_0 = maxScore * 1;
    let slab_1 = maxScore * 0.6;
    let slab_2 = maxScore * 0.25;
    let slab_3 = maxScore * 0.05;
    let slab_4 = maxScore * 0.01;
    if (score === slab_0) credits = quizPrice * 1;
    else if (score >= slab_1 && score < slab_0) credits = quizPrice * 0.6;
    else if (score >= slab_2 && score < slab_1) credits = quizPrice * 0.25;
    else if (score < slab_2 && score >= slab_3) credits = quizPrice * 0.05;
    else if (score < slab_3 && score >= slab_4) credits = quizPrice * 0.01;
    else credits = quizPrice * 0.0025;
    return credits;
  };
  const lifeFifty = () => {
    // console.log("inside life fifty");
    if (lifeLinesUsed.fifty) {
      return false;
    }
    setLifeLinesUsed((prev) => {
      return {
        ...prev,
        fifty: true,
      };
    });
    let positionsToRemove = [];

    qData[count].answer.forEach((ans, index) => {
      if (ans != qData[count].correct) positionsToRemove.push(index);
    });

    // console.log(positionsToRemove);

    let indexToPop = Math.floor(Math.random() * 3);
    positionsToRemove.splice(indexToPop, 1);
    let tempSetLifeStateArr = [];
    [0, 1, 2, 3].forEach((num) => {
      if (positionsToRemove.includes(num)) tempSetLifeStateArr.push(false);
      else tempSetLifeStateArr.push(true);
    });
    setLifeFiftyState(tempSetLifeStateArr);
  };

  const lifePoll = () => {
    if (lifeLinesUsed.poll) {
      return false;
    }
    setLifeLinesUsed((prev) => {
      return {
        ...prev,
        poll: true,
      };
    });

    let pollResults = [0, 0, 0, 0];
    let correctIndex = qData[count].answer.indexOf(qData[count].correct);

    let numLeft = 100;
    pollResults[correctIndex] = randomIntFromInterval(35, 65);
    let correctFound = false;
    numLeft = numLeft - pollResults[correctIndex];

    [0, 1, 2, 3].forEach((num, index) => {
      if (index == correctIndex) correctFound = true;
      else {
        if ((index == 2 && !correctFound) || index == 3) {
          pollResults[index] = numLeft;
        } else {
          let number = randomIntFromInterval(0, numLeft);
          pollResults[index] = number;
        }
        numLeft = numLeft - pollResults[index];
      }
    });
    setLifePollState(pollResults);
    setLifePollShow(true);
  };
  const lifeTimer = () => {
    if (lifeLinesUsed.freeze) {
      return false;
    }
    setLifeLinesUsed((prev) => {
      return {
        ...prev,
        freeze: true,
      };
    });
    setLifeFreeze(true);
  };
  const lifeFlip = () => {
    if (lifeLinesUsed.flip) {
      return false;
    }
    setLifeLinesUsed((prev) => {
      return {
        ...prev,
        flip: true,
      };
    });
    if (qData.length <= count + 1) {
      history.push("/home");
    } else {
      setCount(count + 1);
    }
  };

  const lifeUse = (life) => {
    // console.log("used a life line " + life);
    let adRewardFlag = true;
    let adsActive = true;
    let adWatch = false;
    if (adsActive) {
      // window.adConfig = function (o) {
      //     window.adsbygoogle.push(o);
      // };
      // window.adBreak = function (o) {
      //     window.adsbygoogle.push(o);
      // };

      window.adBreak({
        type: "reward",
        name: "lifeline",
        beforeReward: (showAdFn) => {
          adRewardFlag = false;
          // console.log(adRewardFlag);
          showAdFn();
          freezeRef.current = true;
        },
        adDismissed: () => {
          console.log("Ad Dismissed before time");
        },

        adViewed: () => {
          // console.log("Ad Dismissed after time");
          adRewardFlag = true;
          adWatch = true;
          freezeRef.current = false;
        },

        adBreakDone: () => {
          setLifeFreeze(false);
          // console.log("Ad Break Done", adRewardFlag);
          if (adRewardFlag && adWatch) {
            callLife(life, adRewardFlag);
          } else if (adRewardFlag) {
            freezeRef.current = true;
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
          setTimeout(() => {
            freezeRef.current = false;
          }, 5000);
        },
      });
    }
  };

  const callLife = (life, adReward) => {
    if (adReward) {
      switch (life) {
        case "fifty":
          lifeFifty();
          break;
        case "poll":
          lifePoll();
          break;
        case "timer":
          lifeTimer();
          break;
        case "flip":
          lifeFlip();
          break;
        default:
        // console.log("invalid option");
      }
    }
  };

  useEffect(() => {
    // let time = 60;

    let inter = time;
    const timer = setInterval(() => {
      if (freezeRef.current) {
      } else {
        setProgress((oldProgress) => {
          if (oldProgress === 0) {
            history.push("/home");
          }
          const diff = ((inter - 1) / (time - 1)) * 100;
          inter--;
          setTimeProgress(inter);
          return Math.trunc(diff);
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  function stopTimer() {
    freezeRef.current = true;
  }

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
      {loading && (
        <div className="flex justify-center align-center">
          <img src={loadinggif} alt="loading quiz" />
        </div>
      )}
      {data && (
        <div
        // className={
        //     green
        //         ? "h-screen shadow-custom shadow-green-500"
        //         : green === false
        //         ? "h-screen shadow-custom shadow-red-500"
        //         : "h-[77vh] p-2"
        // }
        // style={{
        //     height: "77vh",
        //     boxShadow: green
        //         ? "inset 0px 0px 20px 20px rgba(0,128,0,0.9)"
        //         : green === false
        //         ? "inset 0px 0px 20px 20px rgba(255,0,0,0.5)"
        //         : "",
        //     padding: "6px",
        // }}
        >
          {/* {quizt20 === checkQuizId ? (
            // <div className="border-4 h-12 flex items-center">
            //   <h1>{teamScore}</h1>
            // </div>
          ) : (
            <></>
          )} */}
          {/* play and win 10000 coins */}
          {/* <div className="flex gap-2 items-center px-5">
            <img
              className="w-[60px] object-cover sm:w-[58px] rounded-lg"
              src={
                location.state.activeData[0]?.image ||
                location.state.activeData[0]?.img
              }
              alt="active"
            />
            <div>
              <div className="text-[10px] text-text_hd font-black sm:text-[8px]">
                {" "}
                {location.state.activeData[0].title}{" "}
              </div>
              <div className="flex gap-1 text-[18px] font-black sm:text-[14px]">
                Play & Win{" "}
                <img
                  className="w-[20px] object-contain"
                  src={Coin}
                  alt="Play"
                />{" "}
                {location.state.activeData[0].totalPrice}
              </div>
              {/* <div className='text-[12px] text-text sm:text-[10px]'> Winner announcement @ {currentData.announcement}</div> */}
          {/* </div>
          </div> */}
          {/* <div className=" text-[#bac8ff] font-bold">
            Question {count + 1}
            <span className="text-[13px]">/{qData.length}</span>
          </div> */}
          <div className="flex gap-2 items-center w-full">
            <div>
              <span className="text-[14px] bold">Question {count + 1}</span>
              <span className="text-[13px]">/{qData.length}</span>
            </div>
            <LinearProgress
              style={{
                width: "60%",
                color: "green",
                transform: "rotate(180deg)",
              }}
              color={
                progress >= 70
                  ? "success"
                  : progress >= 40
                  ? "warning"
                  : "error"
              }
              variant="determinate"
              value={progress}
            />
            <div
              className={`flex gap-1 items-center justify-center text-[10px] w-20 font-bold text-[${
                progress >= 70
                  ? "text-[#008000]"
                  : progress >= 40
                  ? "#cca473"
                  : "#ff000e"
              }]`}
            >
              <span className="text-lg">{timeProgress}</span>
              {/* <span clasName="text-[12px]"> SEC LEFT </span> */}
            </div>
          </div>
          <div className="text-lg font-bold text-center min-h-[70px] max-h-[70px] flex justify-center items-center">
            {data.question}
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-full mb-4">
            {data.answer.map((data, index) => {
              return (
                <>
                  <div
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
                    className="flex flex-col justify-center items-center text-base py-2 px-2 min-h-[60px] max-h-[60px] bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer"
                    onClick={() => next(data)}
                  >
                    <div
                      style={{
                        display: lifeFiftyState[index] ? "block" : "none",
                      }}
                      className=" flex justify-center items-center text-center shrink-0 w-full"
                    >
                      <div className="p-2 text-sm w-full">
                        {index === 0 && (
                          <div className="flex justify-center gap-2">
                            {data}
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex justify-center gap-2">
                            {data}
                          </div>
                        )}
                        {index === 2 && (
                          <div className="flex justify-center gap-2">
                            {data}
                          </div>
                        )}
                        {index === 3 && (
                          <div className="flex justify-center gap-2">
                            {data}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-1 text-lg font-bold">
            Your Score :{" "}
            <span className="text-text_yellow">
              {" "}
              {correctCount * 50 - incorrectCount * -25}{" "}
            </span>
          </div>
          <GoogleAds adSlot="ingame" />
          <div className="mt-4 bg-bg_nav min-h-[70px] bottom-[-3rem] fixed left-0 min-w-[520px] max-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full">
            <div className="h-[1px] bg-border relative">
              <div
                className="border-border border-[1px] rounded-full left-[33%] px-3 py-2 flex gap-2 justify-center items-center absolute top-[-18px] bg-bg_nav text-sm cursor-pointer transition-all duration-500 min-w-[30%]"
                onClick={() => {
                  setShow(!show);
                  setLifePollShow(false);
                }}
              >
                <FavoriteIcon fontSize="12px" style={{ color: "#0279d3" }} />
                <span> {show ? "Lifelines" : "Tap to use Lifelines"} </span>
              </div>
            </div>
            <div
              style={{
                height: show ? "150px" : null,
                borderWidth: !show ? "0px" : null,
              }}
              className="flex mt-8 text-[12px] items-start justify-evenly transition-all duration-1000 h-[0] overflow-hidden"
            >
              <div
                className={
                  lifePollShow
                    ? "w-full h-[70%] absolute items-center justify-evenly text-base bg-bg_nav top-4 flex z-10 flex-col mt-[0.5rem]"
                    : "w-full h-full absolute items-center justify-evenly text-base bg-bg_nav top-4 hidden"
                }
              >
                <div className="flex w-[50%] justify-evenly">
                  <div className="flex flex-col justify-center items-center gap-1">
                    A - {lifePollState[0]} %
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    B - {lifePollState[1]} %
                  </div>
                </div>
                <div className="flex w-[50%] justify-evenly">
                  <div className="flex flex-col justify-center items-center gap-1">
                    C - {lifePollState[2]} %
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    D - {lifePollState[3]} %
                  </div>
                </div>
              </div>
              <div
                className={
                  lifeLinesUsed.fifty
                    ? "flex flex-col gap-1 justify-center items-center cursor-pointer grayscale"
                    : "flex flex-col gap-1 justify-center items-center cursor-pointer"
                }
                onClick={() => lifeUse("fifty")}
              >
                <div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
                  50:50
                </div>
                <div>50:50</div>
              </div>
              <div
                className={
                  lifeLinesUsed.poll
                    ? "flex flex-col gap-1 justify-center items-center cursor-pointer grayscale"
                    : "flex flex-col gap-1 justify-center items-center cursor-pointer"
                }
                onClick={() => lifeUse("poll")}
              >
                <div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
                  <img src={Audience} alt="audience poll" />
                </div>
                <div>Audience poll</div>
              </div>
              <div
                className={
                  lifeLinesUsed.freeze
                    ? "flex flex-col gap-1 justify-center items-center cursor-pointer grayscale"
                    : "flex flex-col gap-1 justify-center items-center cursor-pointer"
                }
                onClick={() => lifeUse("timer")}
              >
                <div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
                  <img src={Freez} alt="Freeze" />
                </div>
                <div>Freeze Timer</div>
              </div>
              <div
                className={
                  lifeLinesUsed.flip
                    ? "flex flex-col gap-1 justify-center items-center cursor-pointer grayscale"
                    : "flex flex-col gap-1 justify-center items-center cursor-pointer"
                }
                onClick={() => lifeUse("flip")}
              >
                <div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
                  <img src={Flip} alt="Flip" />
                </div>
                <div>Flip Question</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !data && (
        <div className="flex flex-col justify-center h-full">
          <img src={working} alt="working" />
          <h1 className="text-center">
            we are still uploading questions in this quiz
          </h1>

          <button
            onClick={() => history.push("/home")}
            className="rounded-full px-7 py-2 w-1/2 m-auto my-4"
            style={{ background: "#1a2f77" }}
          >
            Home
          </button>
          {stopTimer()}
        </div>
      )}
    </>
  );
};

export default SimpleQuiz;
