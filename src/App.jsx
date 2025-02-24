/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import ScoreCard from "./Screens/Home/Quiz/ScoreCard";
import { ClientID } from "./GlobalStorage/actions/client.js";
import { useCookies } from "react-cookie";
// Screens/Components
import CheckComponentProvider from "./LoadContext";
import Home from "./Screens/Home/Home";
import FullScoreCard from "./Screens/Home/Quiz/FullScoreCard";
import Login from "./Screens/Register/Login";
import ScoreFootball from "./Screens/Home/Quiz/ScoreFootball";
// import Dashboard from "./Screens/Dashboard";

import RouteChangeHandler from "./RouteChangeHandler";

import Starter from "./Screens/Starter/Starter";
import { toast, ToastContainer } from "react-toastify";
import { getUser } from "./API/Auth";
import { useSelector, useDispatch } from "react-redux";

import { addUser } from "./GlobalStorage/actions/user";
import LoadScript from "./LoadScript";
import axios from "axios";
import ReactGA from "react-ga4";
import GoogleAds from "./GoogleAds";
import PrivacyPolicy from "./Screens/Home/PrivacyPolicy";
import Question2 from "./Screens/Starter/Question2";
import Question3 from "./Screens/Starter/Question3";
import Question4 from "./Screens/Starter/Question4";
import Question5 from "./Screens/Starter/Question5";
import Question6 from "./Screens/Starter/Question6";
import Question7 from "./Screens/Starter/Question7";
import Question8 from "./Screens/Starter/Question8";
import Question9 from "./Screens/Starter/Question9";
import Question10 from "./Screens/Starter/Question10";
import VideoComponent from "./videoComponent";
import AdContainerComponent from "./AdContainerComponent";
import AskPlay from "./Screens/Starter/AskPlay";
import EmailLogin from "./Screens/Register/EmailLogin.jsx";
import EmailSignup from "./Screens/Register/EmailSignup.jsx";
import {
  loginUser,
  updateUserProfile,
} from "./GlobalStorage/actions/userActions.js";
import AnchorAd from "./AnchorAd.jsx";
import getClientData from "./API/clientData.js";
import sendErrorToDiscord from "./API/Error.js";

const ProtectedRouts = (props) => {
  let dispatch = useDispatch();
  // let history = useHistory();
  let userData = useSelector((state) => state.userReducer);
  let refreshUser = useSelector((state) => state.refreshUser);

  const [cookies] = useCookies(["token"]);
  //   console.log(refreshUser)


  useEffect(() => {
    const token = cookies.token;

    if (token && userData.user) {
      let headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const getClient = async (headers) => {
        let res = await getUser(headers);
        dispatch(updateUserProfile(res.data.data));
      };
      getClient();
    }
  }, [refreshUser]);

 
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
      <Switch>
        <Route path="/home" component={Home} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
      </Switch>
    </>
  );
};

const App = () => {
  // const [loaded, setLoaded] = useState(false);
  // let clientid = useSelector((state) => state.clientId);
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState(null);
  let dispatch = useDispatch();
  const [channelId, setChannelId] = useState(null);
  const [country, setCountry] = useState(null);
  const [isFraud, setIsFraud] = useState(null);
  // const [channelId, setChannelId] = useState(null);
  // const [country, setCountry] = useState(null);
  // const [isFraud, setIsFraud] = useState(null);
  // console.log(clientid);
  // useEffect(() => {
  //   const scriptLoad = async () => {
  //     let data = await axios.get("https://cdn.unibots.in/quiz/quiz_new.json");
  //     let subdomain = window.location.host.split(".")[0];
  //     let client = data.data[subdomain];
  //     client = client ? client : data.data["default"];
  //     let channel = client.id;
  //     setChannelId(channel);
  //     // setChannelId(channel);
  //     let ga = client.ga;
  //     let pubId = client.pubid;
  //     // // console.log("pubId", pubId);
  //     // pubId = "1203149545224208"
  //     dispatch(ClientID({ pubId }));
  //     ReactGA.initialize(ga);
  //     LoadScript(channel, subdomain, pubId);
  //     ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  //   };

  //   scriptLoad();
  // }, []);
  const loadClarity = (clarityId) => {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = `https://www.clarity.ms/tag/${i}`;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  };

  useEffect(() => {
    console.log('inside useEffect')
    const checkAds = async () => {
      console.log('checkAds')
        try {
          console.log('try block')
            const response = await axios.get('http://localhost:8000/check-ads');
            console.log('response',response);
            if(!response){
              console.log('response not found')
            }
           
        } catch (err) {
            
            console.error('Error during ad check:', err);
        } 
    };

    checkAds();  // Call the checkAds function when the component mounts
}, []);


  useEffect(() => {
    const scriptLoad = async () => {
      try {
        // Extract subdomain (or use a fixed value)
        let subdomain = window.location.host.split(".")[0];

        // Get client data based on the subdomain
        const response = await getClientData(subdomain);

        // Extract and set client and channel info
        let client = response?.client || "default";
        const channel = response?.id ?? "5795623987";
        const ga = response?.ga ?? "G-KNLRHMD636";
        const pubId = response?.pubid;

        // Dispatch pubId to redux store
        dispatch(ClientID({ pubId }));

        // Initialize Google Analytics with the GA code
        ReactGA.initialize(ga);

        // Load additional scripts or functions as needed
        LoadScript(channel, subdomain, pubId);

        // Send a pageview to Google Analytics
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });

        // Get the clarity code from the response and load the Clarity script dynamically
        const clarityCode = response?.clarity;
        if (clarityCode) {
          loadClarity(clarityCode);
        } else {
          console.warn("Clarity code not provided in client data.");
        }
      } catch (error) {
        console.error("Error loading client data:", error);
        await sendErrorToDiscord(err, `Failed to fetch client data`);
      }
    };

    scriptLoad();
  }, []);

  useEffect(() => {
    const setGeoCode = async () => {
      try {
        let url =
          "https://pro.ip-api.com/json/?fields=status,message,continentCode,countryCode,query&key=LWKtz4EzQwMJRyQ";
        let response = await fetch(url);
        let res = await response.json();
        console.log("country geo", res);
        if (res.status === "success") {
          setCountry(res.countryCode);
          // let isUserValid = await fetch(
          //   "https://adsense.unibots.in/fraud_detection",
          //   {
          //     method: "POST",
          //     headers: {
          //       ip: res.query,
          //     },
          //   }
          // );
          // let check = await isUserValid.json();
          // console.log("is user valid", check);
          // if (check.error === true) {
          //   setIsFraud(false);
          // } else {
          //   setIsFraud(true);
          // }
          // } else {
          //   console.log("country not found");
          //   setIsFraud(false);
        }
        // return res;
      } catch (error) {
        console.log(error);
        // setIsFraud(false);
      }
    };
    if (network?.toLowerCase() === "taboola" || network === "adgebra") {
      setGeoCode();
    }
  }, []);

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let subId = urlParams.get("subid1")
    ? urlParams.get("subid1")
    : urlParams.get("subid")
    ? urlParams.get("subid")
    : urlParams.get("subId")
    ? urlParams.get("subId")
    : "OPTIONAL";
  let network = urlParams.get("network");
  useEffect(() => {
    let ub_cpc = 0.0;
    // console.log(channelId, network);
    if (channelId && network?.toLowerCase() === "taboola" && country) {
      // Taboola click track start
      let flag = false;
      function checkInitTabools() {
        const adsenseUrl =
          "https://adsense.unibots.in/get_adsense/" + channelId + "/" + country;

        fetch(adsenseUrl)
          .then((response) => response.json())
          .then((data) => {
            let firstKey;
            if (data.error === false) {
              for (let key in data.data) {
                if (data.data.hasOwnProperty(key)) {
                  firstKey = key;
                  break; // Stop the loop after finding the first key
                }
              }
              ub_cpc = data.data[firstKey];
              if (!flag) {
                function beforeUnloadListener() {
                  if (document.hidden) {
                    (function () {
                      window._tfa.push({
                        notify: "event",
                        name: "Final_Click_Page_Conv",
                        id: 1591724,
                      });
                      !(function () {
                        var c = "click_id";
                        !(function () {
                          var e,
                            t =
                              "https://flarequick.com/cf/cv?click_id=" +
                              subId +
                              "&payout=" +
                              ub_cpc +
                              "&txid=OPTIONAL&ct=finalconversion",
                            n = document.createElement("script"),
                            i = document.scripts[0],
                            o = new RegExp(
                              "(^| )".concat("cf_click_id", "=([^;]+)")
                            ),
                            a = document.cookie.match(o);
                          if (a)
                            if (-1 < t.indexOf("".concat(c, "="))) {
                              var r = new RegExp("".concat(c, "=.*?(&|$)"));
                              t = t.replace(
                                r,
                                "".concat(c, "=") + a.pop() + "&"
                              );
                            } else {
                              var d = -1 < t.indexOf("?") ? "&" : "?";
                              t += d + "".concat(c, "=") + a.pop();
                            }
                          (n.src = t),
                            null == (e = i.parentNode) ||
                              void 0 === e ||
                              e.insertBefore(n, i);
                        })();
                      })();
                      // Taboola click track end
                    })();
                    document.removeEventListener(
                      "visibilitychange",
                      beforeUnloadListener
                    );
                    return;
                  } else {
                    console.log("user is back on your page");
                  }
                }
                window.addEventListener("focus", function () {
                  document.removeEventListener(
                    "visibilitychange",
                    beforeUnloadListener
                  );
                  console.log("in focus");
                });
                let instag = document.querySelectorAll(".adsbygoogle");
                console.log("instags", instag);
                for (let i = 0; i < instag.length; i++) {
                  let tag = instag[i];
                  let InterstatialPresent = tag.getAttribute(
                    "data-slotcar-interstitial"
                  );
                  console.log("InterstatialPresent--", InterstatialPresent);
                  if (InterstatialPresent && !flag) {
                    // eslint-disable-next-line no-loop-func
                    window.addEventListener("blur", function () {
                      if (document.activeElement.tagName === "IFRAME") {
                        flag = true;
                        document.addEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        return;
                      } else {
                        document.removeEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        console.log("removed visibility change event");
                      }
                    });
                  }
                }
                if (!flag) {
                  checkInitTabools();
                }
              }
            } else {
              console.log("channel data is not present");
              if (!flag) {
                function beforeUnloadListener() {
                  if (document.hidden) {
                    (function () {
                      window._tfa.push({
                        notify: "event",
                        name: "Final_Click_Page_Conv",
                        id: 1591724,
                      });
                      !(function () {
                        var c = "click_id";
                        !(function () {
                          var e,
                            t =
                              "https://flarequick.com/cf/cv?click_id=" +
                              subId +
                              "&payout=" +
                              ub_cpc +
                              "&txid=OPTIONAL&ct=finalconversion",
                            n = document.createElement("script"),
                            i = document.scripts[0],
                            o = new RegExp(
                              "(^| )".concat("cf_click_id", "=([^;]+)")
                            ),
                            a = document.cookie.match(o);
                          if (a)
                            if (-1 < t.indexOf("".concat(c, "="))) {
                              var r = new RegExp("".concat(c, "=.*?(&|$)"));
                              t = t.replace(
                                r,
                                "".concat(c, "=") + a.pop() + "&"
                              );
                            } else {
                              var d = -1 < t.indexOf("?") ? "&" : "?";
                              t += d + "".concat(c, "=") + a.pop();
                            }
                          (n.src = t),
                            null == (e = i.parentNode) ||
                              void 0 === e ||
                              e.insertBefore(n, i);
                        })();
                      })();
                      // Taboola click track end
                    })();
                    document.removeEventListener(
                      "visibilitychange",
                      beforeUnloadListener
                    );
                    return;
                  } else {
                    console.log("userback on page");
                  }
                }
                window.addEventListener("focus", function () {
                  document.removeEventListener(
                    "visibilitychange",
                    beforeUnloadListener
                  );
                  console.log("in focus");
                });
                let instag = document.querySelectorAll(".adsbygoogle");
                console.log("instags", instag);
                for (let i = 0; i < instag.length; i++) {
                  let tag = instag[i];
                  let InterstatialPresent = tag.getAttribute(
                    "data-slotcar-interstitial"
                  );
                  console.log("InterstatialPresent--", InterstatialPresent);
                  if (InterstatialPresent && !flag) {
                    // eslint-disable-next-line no-loop-func
                    window.addEventListener("blur", function () {
                      if (document.activeElement.tagName === "IFRAME") {
                        flag = true;
                        document.addEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        return;
                      } else {
                        document.removeEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        console.log("removed visibility change event");
                      }
                    });
                  }
                }
                if (!flag) {
                  checkInitTabools();
                }
              }
            }
          })
          .catch((e) => {
            console.log("channelId is Null", e.message);
          });
      }
      checkInitTabools();
    } else if (channelId && network === "adgebra" && country) {
      let ub_cpc = 0.0;

      let flag = false;
      function checkInt() {
        console.log("checkint function called");
        const adsenseUrl =
          "https://adsense.unibots.in/get_adsense/" + channelId + "/" + country;

        fetch(adsenseUrl)
          .then((response) => response.json())
          .then((data) => {
            let firstKey;
            if (data.error === false) {
              for (let key in data.data) {
                if (data.data.hasOwnProperty(key)) {
                  firstKey = key;
                  break; // Stop the loop after finding the first key
                }
              }
              ub_cpc = data.data[firstKey];
              console.log("flag to check before function call", flag);
              if (!flag) {
                function beforeUnloadListener() {
                  if (document.hidden) {
                    console.log("adgebra init");
                    // Ensure ub_cpc and subId are defined before using them
                    let adg_url = `https://adgebra.co.in/Tracker/Conversion?p1=6667&p2=order_Id&p3=product_Id&p4=cartvalue&p5=${ub_cpc}&convId=${subId}`;

                    // Create and load the script dynamically
                    const scrpt_adg = document.createElement("script");
                    scrpt_adg.src = adg_url;
                    const head =
                      document.head || document.getElementsByTagName("head")[0];

                    // Handle script loading errors if necessary
                    scrpt_adg.onerror = function () {
                      console.error("Error loading adgebra script");
                    };

                    head.appendChild(scrpt_adg);
                    document.removeEventListener(
                      "visibilitychange",
                      beforeUnloadListener
                    );
                    console.log("removed visibility event");
                    return;
                  } else {
                    console.log("User is back on your page.");
                  }
                }
                window.addEventListener("focus", function () {
                  document.removeEventListener(
                    "visibilitychange",
                    beforeUnloadListener
                  );
                  console.log("in focus");
                });

                let instag = document.querySelectorAll(".adsbygoogle");
                console.log("instags", instag);
                for (let i = 0; i < instag.length; i++) {
                  let tag = instag[i];
                  let InterstatialPresent = tag.getAttribute(
                    "data-slotcar-interstitial"
                  );
                  console.log("InterstatialPresent--", InterstatialPresent);
                  if (InterstatialPresent && !flag) {
                    // eslint-disable-next-line no-loop-func
                    window.addEventListener("blur", function () {
                      if (document.activeElement.tagName === "IFRAME") {
                        flag = true;
                        document.addEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        return;
                      } else {
                        document.removeEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        console.log("removed visibility change event");
                      }
                    });
                  }
                }

                if (!flag) {
                  checkInt();
                }
              }
            } else {
              if (!flag) {
                function beforeUnloadListener() {
                  if (document.hidden) {
                    console.log("adgebra init");
                    // Ensure ub_cpc and subId are defined before using them
                    let adg_url = `https://adgebra.co.in/Tracker/Conversion?p1=6667&p2=order_Id&p3=product_Id&p4=cartvalue&p5=${ub_cpc}&convId=${subId}`;

                    // Create and load the script dynamically
                    const scrpt_adg = document.createElement("script");
                    scrpt_adg.src = adg_url;
                    const head =
                      document.head || document.getElementsByTagName("head")[0];

                    // Handle script loading errors if necessary
                    scrpt_adg.onerror = function () {
                      console.error("Error loading adgebra script");
                    };

                    head.appendChild(scrpt_adg);
                    document.removeEventListener(
                      "visibilitychange",
                      beforeUnloadListener
                    );
                    console.log("removed visibility event");
                    return;
                  } else {
                    console.log("User is back on your page.");
                  }
                }
                window.addEventListener("focus", function () {
                  document.removeEventListener(
                    "visibilitychange",
                    beforeUnloadListener
                  );
                  console.log("in focus");
                });

                let instag = document.querySelectorAll(".adsbygoogle");
                console.log("instags", instag);
                for (let i = 0; i < instag.length; i++) {
                  let tag = instag[i];
                  let InterstatialPresent = tag.getAttribute(
                    "data-slotcar-interstitial"
                  );
                  console.log("InterstatialPresent--", InterstatialPresent);
                  if (InterstatialPresent && !flag) {
                    // eslint-disable-next-line no-loop-func
                    window.addEventListener("blur", function () {
                      if (document.activeElement.tagName === "IFRAME") {
                        flag = true;
                        document.addEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        return;
                      } else {
                        document.removeEventListener(
                          "visibilitychange",
                          beforeUnloadListener
                        );
                        console.log("removed visibility change event");
                      }
                    });
                  }
                }

                if (!flag) {
                  checkInt();
                }
              }
            }
          })
          .catch((e) => {
            console.log("channelId is Null", e.message);
          });
      }
      checkInt();
    }
  }, [channelId, country]);
  useEffect(() => {
    // console.log("get user from app");
    const getUserData = async () => {
      const token = cookies.token;
      if (token) {
        // Token exists, make request to backend
        let headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        getUser(headers)
          .then((response) => {
            // Successfully received user data
            // console.log("response-->", response);
            dispatch(loginUser(response.data.data));
            setUserData(response.data.data);
          })
          .catch((error) => {
            // Handle error (e.g., token expired)
            console.error("Error fetching user data:", error);
          });
      }
    };
    getUserData();
  }, [cookies.token]);

  return (
    <>
      {/* {isFraud !== null && isFraud !== true ? ( */}
      {/* <AnchorAd /> */}
      <CheckComponentProvider>
        <Switch>
          <Route exact path="/" component={Starter} />
          <Route exact path="/starter/:cat" component={Starter} />
          <Route exact path="/t20score/:id" component={ScoreCard} />
          <Route exact path="/footballscore/:id" component={ScoreFootball} />
          <Route path="/login" component={EmailLogin} />
          <Route path="/signup" component={EmailSignup} />
          <Route exact path="/scorecard" component={FullScoreCard} />
          <Route exact path="/playquiz" component={AskPlay} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route exact path="/question/1" component={Question2} />
          <Route exact path="/question/2" component={Question3} />
          <Route exact path="/question/3" component={Question4} />
          <Route exact path="/question/4" component={Question5} />
          <Route exact path="/question/5" component={Question6} />
          <Route exact path="/question/6" component={Question7} />
          <Route exact path="/question/7" component={Question8} />
          <Route exact path="/question/8" component={Question9} />
          <Route exact path="/question/9" component={Question10} />

          <ProtectedRouts />
        </Switch>
      </CheckComponentProvider>
      {/* ) : isFraud === true ? (
        <div className="text-white flex flex-col h-[100vh] justify-center items-center">
          <h1 className="text-[2rem] p-[16px] mb-2">User Not Valid!</h1>
          <img
            src={working}
            alt="not a valid user"
            className="object-contain h-60 w-108"
          />
        </div>
      ) : (
        <div className="text-white flex justify-center items-center text-[3rem] h-[100vh]">
          <h1>Loading....</h1>
        </div>
      )} */}
      {/* ) : isFraud === true ? (
        <div className="text-white flex flex-col h-[100vh] justify-center items-center">
          <h1 className="text-[2rem] p-[16px] mb-2">User Not Valid!</h1>
          <img
            src={working}
            alt="not a valid user"
            className="object-contain h-60 w-108"
          />
        </div>
      ) : (
        <div className="text-white flex justify-center items-center text-[3rem] h-[100vh]">
          <h1>Loading....</h1>
        </div>
      )} */}
    </>
  );
};

export default App;
