import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
const CardData = "https://playerstorage.b-cdn.net/quiztwiz/assets/CardData";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { getCategories, getQuizzes } from "../../../API/Question";
const Play = "https://playerstorage.b-cdn.net/quiztwiz/assets/play.svg";
const working = "https://playerstorage.b-cdn.net/quiztwiz/assets/working.png";
import useAnalyticsEventTracker from "../../../useAnalyticsEventTracker";
import showAds from "../../../showAds";

const Card = (props) => {
  const history = useHistory();
  const trackEvent = useAnalyticsEventTracker();
  // console.log(props.allPlayed)
  // console.log("no props")
  // console.log(props.data)
  const goToGame = (id) => {
    trackEvent(
      "button",
      "Category Selected to Play",
      "Category Selected To Play"
    );
    let subdomain = window.location.href.split("//")[1].split(".")[0];
    if (subdomain === "freefirediamond" || subdomain === "fronttest2") {
      showAds();
    }
    // showAds();

    history.push(`/home/quizzes-play/${id}`);
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer"
        onClick={() => goToGame(props.data.title)}
      >
        <div className="flex gap-2 items-center px-2 justify-between">
          <div className="flex flex-col">
            <img
              className="object-cover w-24 rounded-full"
              src={props.data.category.img}
              alt="CategoryImage"
            />
          </div>
          <div className="flex flex-col w-full justify-start">
            <div className="flex text-[10px] text-text_hd font-black sm:text-[8px] flex-col items-end">
              <div className="text-[#64d2ff] max-h-[20px] py-[2px]">
                <div className="flex sm:justify-center  ">
                  {props.data.category.name} &nbsp;| &nbsp;
                  {props.data.title}
                </div>
              </div>
            </div>
            <div className="flex items-end flex-col mt-[5px]">
              <div className="text-[14px] sm:text-[10px] font-black flex">
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
            <div className="flex items-end flex-col mt-[5px]">
              <span className="text-[10px] flex gap-1 sm:text-[8px]  bg-[#30d158] bg-opacity-20 text-[#30d158] px-2 rounded-full">
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
              className="rounded-full object-cover w-24"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CatCard = (props) => {
  return (
    <div
      className="flex hover:bg-secondary  justify-center border-2 border-border rounded-full mx-2 px-2"
      style={{
        backgroundColor: props.selected === props.name ? "#1a2f77" : "",
      }}
      onClick={() => props.handleSelect(props.name)}
    >
      <div className="flex-none px-2 mx-4 py-2">{props.name}</div>
    </div>
  );
};

const GamesList = (props) => {
  const [allQuizzes, setAllQuizzes] = useState(null);
  const [allCats, setAllCats] = useState(null);
  const [currentCat, setCurrentCat] = useState("All");
  const [allPlayed, setAllPlayed] = useState(false);
  const [found, setFound] = useState(true);
  const [have, setHave] = useState([]);
  const [selected, setSelected] = useState("All");

  const handleSelected = (name) => {
    setSelected(name);
  };
  const history = useHistory();
  if (localStorage.getItem("localCoins") !== null) {
    localStorage.removeItem("localCoins");
  }
  useEffect(() => {
    if (
      sessionStorage.getItem("localCoins") == null &&
      sessionStorage.getItem("userData") == null
    ) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    const quizCat = allQuizzes?.filter(
      (item) => currentCat == item.category.name
    );
    // console.log(quizCat)
    setHave(quizCat);

    // console.log("inside useEffect")
  }, [currentCat]);

  let userDB = useSelector((state) => state.userReducer);
  let user = JSON.parse(sessionStorage.getItem("userData"));
  // console.log(userDB);
  // console.log(user);
  useEffect(() => {
    let cancel = false;
    if (userDB.user || user) {
      const alreadyPlayed = userDB?.quizPlayed;
      // console.log("inside userdb");
      if (!cancel) {
        const getQuizData = async () => {
          let res = await getCategories();
          let res2 = await getQuizzes();
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
            let checker = res2.data.data.map((item) => item._id);
            let showQuiz = checker.filter(
              (val) => !alreadyPlayed?.includes(val)
            );
            // console.log(showQuiz);
            // console.log(res2.data.data);
            // const displayQuiz = res2.data.data.filter(
            //     (item) => item._id === showQuiz[0]
            // );
            const display = res2.data.data.filter((item) =>
              showQuiz.includes(item._id)
            );
            // console.log(display);
            // console.log(displayQuiz);
            if (display.length === 0) {
              setAllPlayed(true);
            }
            setAllQuizzes(display);
            let sportsIndex = res.data.data.findIndex(
              (cat) => cat.name === "Sports"
            );
            if (sportsIndex !== -1 && sportsIndex !== 0) {
              // Remove the "Sports" element from its current position
              const sportsCategory = res.data.data.splice(sportsIndex, 1)[0];

              // Insert the "Sports" element at index 2
              res.data.data.splice(0, 0, sportsCategory);
            }

            setAllCats(res.data.data);
            setFound(false);
          }
        };
        getQuizData();
      }
    } else {
      if (!cancel) {
        const getQuizData = async () => {
          let res = await getCategories();
          let res2 = await getQuizzes();
          let localPlayed = JSON.parse(sessionStorage.getItem("localQuiz"));
          let checker = res2.data.data.map((item) => item._id);
          let showQuiz = checker.filter((val) => !localPlayed?.includes(val));
          const display = res2.data.data.filter((item) =>
            showQuiz.includes(item._id)
          );

          if (display.length === 0) {
            setAllPlayed(true);
          }

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
            setAllQuizzes(display);
            let sportsIndex = res.data.data.findIndex(
              (cat) => cat.name === "Sports"
            );
            if (sportsIndex !== -1 && sportsIndex !== 0) {
              // Remove the "Sports" element from its current position
              const sportsCategory = res.data.data.splice(sportsIndex, 1)[0];

              // Insert the "Sports" element at index 2
              res.data.data.splice(0, 0, sportsCategory);
            }

            setAllCats(res.data.data);
            setFound(false);
          }
        };
        getQuizData();
      }
    }
    return () => {
      cancel = true;
    };
  }, []);

  // useEffect(() => {
  //     console.log(currentCat);
  // }, [currentCat]);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 400;
  };
  const sliderRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 400;
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
      <div>
        <div className="flex justify-between relative">
          <MdChevronLeft
            size={80}
            onClick={slideLeft}
            className="cursor-pointer bg-bg  hover:opacity-100  absolute left-[-20px] top-[-6px] h-[50px] w-[20px]"
            style={{ boxShadow: "5px 0px 10px 2px rgba(17, 24, 39, 1)" }}
          />
          <MdChevronRight
            size={40}
            onClick={sliderRight}
            className="cursor-pointer bg-bg  hover:opacity-100 absolute right-[-20px] w-contain top-[-6px] h-[50px] w-[20px]"
            style={{ boxShadow: "-5px 0px 10px 2px rgba(17, 24, 39, 1)" }}
          />
        </div>
        <div
          id="slider"
          className="flex justify-between text-xs pb-1 w-full overflow-x-scroll scrollhide scroll-smooth whitespace-nowrap border-b border-white border-solid"
        >
          <div
            onClick={() => {
              setCurrentCat("All");
            }}
            className="cursor-pointer transition-all flex justify-center"
          >
            <CatCard
              name={"All"}
              selected={selected}
              handleSelect={(name) => handleSelected(name)}
            />
          </div>
          {allCats &&
            allCats.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentCat(data.name);
                  }}
                  className="cursor-pointer transition-all flex justify-center"
                >
                  {
                    <CatCard
                      name={data.name}
                      currentCat={currentCat}
                      selected={selected}
                      handleSelect={(name) => handleSelected(name)}
                    />
                  }
                </div>
              );
            })}
        </div>
      </div>
      {allPlayed && (
        <div className="flex justify-center">you have played all quizzes</div>
      )}
      {allQuizzes !== null ? (
        currentCat == "All" ? (
          allQuizzes.map((data, index) => {
            return (
              <div key={index}>
                {
                  <Card
                    // changeCategoryId={() => {
                    //     goToGame(data._id);
                    // }}
                    data={data}
                    id={data._id}
                    allPlayed={allPlayed}
                  />
                }
              </div>
            );
          })
        ) : have?.length !== 0 ? (
          allQuizzes.map((data, index) => {
            return (
              <>
                {/* <div key={index}>
                                {(currentCat != data.category.name) && <h1>You have played all quizzes in this Category</h1>}
                            </div> */}
                {have?.length === 0 ? (
                  <h1>no data in this quiz</h1>
                ) : (
                  <>
                    {currentCat == data.category.name && (
                      <div key={index}>
                        {
                          <Card
                            // changeCategoryId={() => {
                            //     goToGame(data._id);
                            // }}
                            data={data}
                            id={data._id}
                            allPlayed={allPlayed}
                            allQuizzes={allQuizzes}
                          />
                        }
                      </div>
                    )}
                  </>
                )}
              </>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img className="w-[80%]" src={working} alt="working" />
            <h1>Questions coming soon..</h1>
          </div>
        )
      ) : (
        <>
          {found ? (
            <h1>Loading please wait....</h1>
          ) : (
            <>
              <div>No quiz present</div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default GamesList;
