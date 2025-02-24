import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import { useSelector, useDispatch } from "react-redux";
import GamesList from "./Quiz/GamesList";
import QuizStarter from "./Quiz/QuizStarter";
import SimpleQuiz from "./Quiz/SimpleQuiz";

import Category from "./Category/Category";
import NavBar from "../NavBar/NavBar";
import NavBarBottom from "../NavBar/NavBarBottom";

import Result from "../Result/Result";
import Profile from "./Profile/Profile";
import SidePoster from "../SidePoster/SidePoster";
import QuizPlay from "./Quiz/QuizPlay";

import GoogleAds from "../../GoogleAds";
import ReactGA from "react-ga4";
import { ClientID } from "../../GlobalStorage/actions/client";
import { CheckComponent } from "../../LoadContext";
const Home = (props) => {
  const [categoryId, setCategoryId] = useState("");
  const [score, setScore] = useState("");
  const [gameCredit, setGameCredit] = useState(0);
  const [quizId, setQuizId] = useState(null);
  const [clicks, setClicked] = useState(0);
  let [activeTab, setActiveTab] = useState("home");
  const { startLoad } = useContext(CheckComponent);
  let clientid = useSelector((state) => state.clientId);
  // console.log("home- ", clientid);

  console.log("category id",categoryId);
  const changeCategoryId = (id) => {
    setCategoryId(id);

   
  };
  const setScoreValue = (sc) => {
    setScore(sc);
  };
  const setGameCreditValue = (credit) => {
    setGameCredit(credit);
  };

  function clickChange() {
    setClicked((prev) => prev + 1);
  }

  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });

  let userData = useSelector((state) => state.userData);
  const urlPath = window.location.href;
  const currentPath = urlPath.split("/");
  const lastUrl = currentPath[currentPath.length - 1];
  const domainUrl = currentPath[currentPath.length - 2];

  function changeTab(data) {
    setActiveTab(data);
  }
  const path = window.location.pathname;
  let fromResult;
  let fromLogin;
  let fromNav;
  if (props.location.state) {
    fromResult = props.location.state;
    fromLogin = props.location.state;
    fromNav = props.location.state;
    // console.log(fromResult.fromResult);
    // console.log("fromLogin", fromLogin)
  }
  // console.log("fromResult", fromResult)
  return (
    <>
      <div className="text-white h-screen flex overflow-hidden">
        <div
          className="min-w-[520px] max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border bg-bg"
          style={{
            background: lastUrl === "Result" ? "#111827" : "",
          }}
        >
          {lastUrl === "Result" ? (
            ""
          ) : (
            <NavBar
              gameCredit={gameCredit}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
          <div className="px-5 pt-[2rem] pb-20 flex flex-col w-full gap-6">
            {lastUrl === "home" ? (
              <div className="flex justify-center pt-[2rem]">
                <div className="w-[480px]">
                  {props.location.state ? (
                    <GoogleAds
                      clientId={clientid}
                      startLoad={startLoad}
                      path={path}
                      fromResult={fromResult.fromResult}
                      fromLogin={fromLogin.fromLogin}
                      fromNav={fromNav.fromNav}
                      adSlot="home_inpage"
                    />
                  ) : (
                    <GoogleAds
                      clientId={clientid}
                      startLoad={startLoad}
                      path={path}
                      adSlot="home_inpage"
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <Switch>
              <Route
                exact
                path="/home"
                component={() => GamesList({ changeCategoryId })}
              />
              <Route
                path="/home/categories"
                component={() => Category({ changeCategoryId })}
              />
              <Route path="/home/profile" component={Profile} />
              {/* <Route path="/home/rules" component={Rules} />
                            <Route path="/home/blogs" component={Blogs} /> */}
              <Route
                path="/home/quiz/:id"
                component={() =>
                  SimpleQuiz({
                    score,
                    gameCredit,
                    quizId,
                    setScoreValue,
                    setGameCreditValue,
                    setQuizId,
                  })
                }
              />
              <Route
                path="/home/result"
                component={() =>
                  Result({
                    score,
                    gameCredit,
                    quizId,
                    changeCategoryId,
                    userData,
                    // clicks,
                    // clickChange
                  })
                }
              />
              {/* <Route path="/home/blog/:id" component={Blog} /> */}
              <Route
                path="/home/quizzes-for-category"
                // component={() => QuizStarter({ categoryId,activeTab})}
              >
                <QuizStarter
                  categoryId={categoryId}
                  activeTab={activeTab}
                  func={changeTab}
                />
              </Route>
              <Route
                path="/home/quizzes-play/:title"
                component={() => QuizPlay({ categoryId })}
              />
            </Switch>
            {lastUrl === "Result" ||
            lastUrl === "quiz" ||
            domainUrl === "quiz" ? (
              ""
            ) : (
              <NavBarBottom activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
          </div>
        </div>

        <SidePoster />
      </div>
    </>
  );
};

export default Home;
