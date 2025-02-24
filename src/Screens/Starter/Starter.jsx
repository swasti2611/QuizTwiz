import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";
import SidePoster from "../SidePoster/SidePoster";
import { toast, ToastContainer } from "react-toastify";
import { getQuestions } from "../../API/Question";
const afterReward =
  "https://playerstorage.b-cdn.net/quiztwiz/assets/rewarded.gif";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../GlobalStorage/actions/user";
import { getUser, updateUserCoins } from "../../API/Auth";
import { IoIosNotifications } from "react-icons/io";
import GoogleAds from "../../GoogleAds";
import showAds from "../../showAds";
import pushNotification from "./pushnotification.js";
// import { ClientID } from "../../GlobalStorage/actions/client";
import { CheckComponent } from "../../LoadContext";
// import { sendData } from "../../API/Question";
// import Login from "../Register/Login";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";
import RewardModal from "./RewardModal";
import { useCookies } from "react-cookie";
import QuizPlay from "../Home/Quiz/QuizPlay";
import { updateUserProfile } from "../../GlobalStorage/actions/userActions";
import PopUp from "../../PopUp.jsx";
import AnchorAd from "../../AnchorAd.jsx";
// const bellStyle = {
//   fontSize: "4rem",
//   color: "#FFD700", // Yellow color
//   animation: "ring 1s ease infinite", // Apply animation
//   display: "inline-block", // Ensures the icon doesn't take full width
// };

// // Define keyframes
// const keyframes = `@keyframes ring {
//   0% {
//     transform: translateX(0);
//   }
//   50% {
//     transform: translateX(10px); /* Adjust the value to change the distance */
//   }
//   100% {
//     transform: translateX(0);
//   }
// }`;

// // Add keyframes to the document
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
const Starter = (props) => {
  localStorage.removeItem("localCoins");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [qData, setQData] = useState(null);
  const { startLoad, checkPage } = useContext(CheckComponent);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [ans, setAns] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [wrong, setWrong] = useState(null);
  const trackEvent = useAnalyticsEventTracker();
  let userData = useSelector((state) => state.userReducer);
  // console.log("userData-->", userData);
  let refreshUser = useSelector((state) => state.refreshUser);
  let { cat } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adViewedComplete, setAdViewedComplete] = useState(false);
  const isMobile = () => {
    let check = false;
    ((a) => {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      // Check if token exists
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies.token]);

  let onMobile = isMobile();
  let clientid = useSelector((state) => state.clientId);
  // console.log(cat);
  const { search } = useLocation();
  // console.log("search", search);
  const searchParams = new URLSearchParams(search);

  // console.log("search params", searchParams);
  let teams = [];
  for (const p of searchParams) {
    teams.push(p[1]);
  }
  let subdomain = window.location.href.split("//")[1].split(".")[0];
  if (subdomain === "soapopera") {
    subdomain = "soaps";
  }

  let url = window.location.href;

  const urlObject = new URL(url);

  // Extract the link parameter value
  const linkParameter = urlObject.searchParams.get("link");
  let redirectLink = linkParameter;

  const imageParameter = urlObject.searchParams.get("image");
  let imageUrl = imageParameter;
  // console.log("link param", linkParameter);

  let domainsList = [
    "cricket",
    "ncis",
    "soaps",
    "sudhir",
    "kamal",
    "novaneural",
    "rinzler",
    "lembark",
    "lathiyainfotech",
    "novaneural2",
    "androtech",
    "samsul",
    "openweb",
    "winacle",
    "lewishamilton",
    "lpbw1",
    "sisterwives1",
    "novaneural3",
    "lolo",
    "coreaspire",
    "lembark2",
    "hws",
    "wooper1",
    "wooper2",
    "wooper3",
    "wooper4",
    "wooper5",
    "wooper6",
    "wooper7",
    "novaneural4",
    "newspaper24hr",
    "mahadev",
    "radheytechnology",
    "bengalyojana",
    "woxxin2",
    "vuvu",
    "radheytechnology2",
    "defaultnew",
    "capity",
    "radheytechnology3",
    "radheytechnology4",
    "dino",
    "lathiyainfotech2",
    "shreenathinfotech",
    "defaultnew2",
    "defaultnew3",
    "default5",
    "default6",
    "default7",
    "native",
    "abp",
    "moneycontrol",
    "mscfootball",
    "newswakerquiz",
    "harsh",
    "dailywize",
  ];

  let domainList = [
    "monetix-nksolution2",
    "yapps",
    "dailyjanakantha",
    "monetix-logicgo1",
    "ittefaq",
    "monetix-mbinfotech-1",
    "monetix-mbinfotech",
    "monetix-logicgo2",
    "monetix-bhaveshbhai",
    "shreenathji1",
    "mathrubhumi",
    "hotaykiviral",
    "dainikamadershomoy",
    "monetix-vishvambhari1",
    "monetix-vishvambhari2",
    "monetix-vishvambhari3",
    "monetix-nksolution1",
    "monetix-dreaminfotech",
    "banglaxp",
    "cricket",
    "ragalahari",
    "biggbossteluguvoteonline",
    "biggboss7teluguvote",
    "biggbosstamilvote",
    "biggbossteluguvote-quiz",
    "saqlen",
    "bgmgfx",
    "ncis",
    "soaps",
    "sudhir",
    "kamal",
    "mtnews24",
    "novaneural",
    "rinzler",
    "lembark",
    "lathiyainfotech",
    "novaneural2",
    "androtech",
    "samsul",
    "openweb",
    "winacle",
    "lewishamilton",
    "lpbw1",
    "sisterwives1",
    "novaneural3",
    "lolo",
    "coreaspire",
    "lembark2",
    "hws",
    "wooper1",
    "wooper2",
    "wooper3",
    "wooper4",
    "wooper5",
    "wooper6",
    "wooper7",
    "novaneural4",
    "newspaper24hr",
    "mahadev",
    "radheytechnology",
    "bengalyojana",
    "woxxin2",
    "vuvu",
    "radheytechnology2",
    "defaultnew",
    "capity",
    "alldaydigital1",
    "radheytechnology3",
    "radheytechnology4",
    "dino",
    "lathiyainfotech2",
    "shreenathinfotech",
    "defaultnew2",
    "defaultnew3",
    "default5",
    "default6",
    "default7",
    "native",
    "abp",
    "moneycontrol",
    "mscfootball",
    "newswakerquiz",
    "harsh",
    "monetix1",
    "monetix2",
    "monetix3",
    "monetix4",

    "monetix6",
    "monetix7",
    "monetix8",
    "monetix9",
    "monetix10",
    "monetix11",
    "monetix12",
    "monetix13",
    "monetix14",
    "monetix15",
    "monetix16",
    "monetix17",
    "monetix18",
    "monetix19",
    "monetix20",
    "monetix21",
    "monetix22",
    "monetix23",

    "monetix25",
    "monetix26",
    "monetix27",
    "monetix28",
    "monetix29",

    "monetix31",
    "monetix32",
    "monetix33",
    "novaneural1",
    "striking",
    "fskintools",
    "abhishek",
    "default3",
    "default4",
    "sangbadpratidin",
    "viraldailykhabar",
    "igamez",
    "madhyamam",
    "ecosoft1",
  ];
  let defaultNewDomains = [
    "monetix-nksolution2",
    "yapps",
    "dailyjanakantha",
    "monetix-mbinfotech-1",
    "ittefaq",
    "monetix-bhaveshbhai",
    "monetix-logicgo1",
    "monetix-logicgo2",
    "monetix-mbinfotech",
    "monetix-vishvambhari1",
    "monetix-vishvambhari2",
    "monetix-vishvambhari3",
    "monetix-nksolution1",
    "monetix-dreaminfotech",
    "banglaxp",
    "monetix29",

    "monetix31",
    "monetix32",
    "monetix33",
    "alldaydigital1",
    "shreenathji1",
    "hotaykiviral",
    "biggbossteluguvoteonline",
    "biggboss7teluguvote",
    "biggbosstamilvote",
    "biggbossteluguvote-quiz",
    "ragalahari",
    "saqlen",
    "sangbadpratidin",
    "bgmgfx",
    "viraldailykhabar",
    "igamez",
    "madhyamam",
    "abhishek",
    "default3",
    "default4",
    "sangbadpratidin",
    "viraldailykhabar",
    "igamez",
    "monetix1",
    "defaultnew2",
    "defaultnew3",
    "monetix19",
    "monetix20",
    "monetix21",
    "monetix22",
    "monetix23",
    "monetix23",

    "monetix25",
    "monetix26",
    "monetix27",
    "monetix28",
    "monetix2",
    "monetix3",
    "monetix4",

    "monetix6",
    "monetix7",
    "monetix8",
    "monetix9",
    "monetix10",
    "monetix11",
    "monetix12",
    "monetix13",
    "monetix14",
    "monetix15",
    "monetix16",
    "monetix17",
    "monetix18",
    "novaneural1",
    "striking",
    "fskintools",
  ];
  let rinzlerDomains = [
    "novaneural",
    "rinzler",
    "lathiyainfotech",
    "novaneural2",
    "androtech",
    "samsul",
    "openweb",
    "novaneural3",
    "lolo",
    "coreaspire",
    "hws",
    "wooper1",
    "wooper2",
    "wooper3",
    "wooper4",
    "wooper5",
    "wooper6",
    "wooper7",
    "novaneural4",
    "newspaper24hr",
    "mahadev",
    "radheytechnology",
    "bengalyojana",
    "woxxin2",
    "vuvu",
    "radheytechnology2",
    "capity",
    "radheytechnology3",
    "radheytechnology4",
    "dino",
    "lathiyainfotech2",
    "shreenathinfotech",
  ];

  // console.log("subdomain", subdomain);

  useEffect(() => {
    function getMultipleRandom(arr, num, isFiltered) {
      // console.log("array data", arr);
      if (!isFiltered) {
        arr = arr.data.data;
      }
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }
    const pullQuestions = async () => {
      let filtered;
      if (
        (sessionStorage.getItem("localCoins") != null ||
          userData.user !== null) &&
        cat !== "t20" &&
        cat !== "football"
      ) {
        history.push("/home");
      } else if (cat) {
        // let startQs = await getQuestions(null, null, null, true);

        let startQs;
        if (cat === "t20" || cat === "football") {
          // console.log("questions of t20 world cup");
          console.log("teams", teams);
          if (
            teams[0] === "" ||
            teams[0] === "undefined" ||
            teams[1] === "" ||
            teams[1] === "undefined"
          ) {
          } else {
            startQs = await getQuestions(null, null, null, true, "iplNewQuiz");
          }
          // console.log(startQs);
          // console.log(startQs ,"line 74");
          filtered = startQs?.data?.data?.filter(
            (item) =>
              item.quizName ===
                (teams[0] === "" || teams[0] === "undefined"
                  ? "iplNewQuiz"
                  : teams[0]) ||
              item.quizName ===
                (teams[1] === "" || teams[1] === "undefined"
                  ? "iplNewQuiz"
                  : teams[1])
          );
          // console.log(filtered)
          let random = getMultipleRandom(startQs, 10);
          // console.log(random);
          setQData(random);
        } else {
          filtered = startQs.data.data.filter((item) => item.quizName === cat);
          let random = getMultipleRandom(filtered, 3);
          setQData(random);
        }
      } else if (subdomain === "cricketz") {
        // console.log("inside cric")
        let startQs = await getQuestions(null, null, null, true, "india");
        // console.log("startQs", startQs)
        let random = getMultipleRandom(startQs, 10);
        setQData(random);
      } else if (subdomain === "opportunitiesbrazil") {
        let startQs = await getQuestions(null, null, null, true, "bra");
        // console.log("startQs", startQs)
        let random = getMultipleRandom(startQs, 5);
        setQData(random);
      } else if (subdomain === "oportunidadesbrasil1") {
        let startQs = await getQuestions(null, null, null, true, "braPort");
        // console.log("startQs", startQs)
        let random = getMultipleRandom(startQs, 10);
        setQData(random);
      } else if (subdomain === "oportunidadesbrasil2") {
        let startQs = await getQuestions(null, null, null, true, "braSpanish");
        // console.log("startQs", startQs)
        let random = getMultipleRandom(startQs, 10);
        setQData(random);
      } else if (domainList.includes(subdomain)) {
        console.log("inside domain list");
        if (rinzlerDomains.includes(subdomain)) {
          let startQ = await getQuestions(null, null, null, true, "rinzler");
          filtered = startQ;
          // return item.quizName === "rinzler";
        } else if (subdomain === "lewishamilton" || subdomain === "winacle") {
          let startQ = await getQuestions(null, null, null, true, "winacle");
          filtered = startQ;
          // return item.quizName === "winacle";
        } else if (subdomain === "lembark2") {
          let startQ = await getQuestions(null, null, null, true, "lembark");
          filtered = startQ;
          // return item.quizName === "lembark";
        } else if (
          subdomain === "default5" ||
          subdomain === "default6" ||
          subdomain === "default7"
        ) {
          let startQ = await getQuestions(null, null, null, true, "ipl2023");
          filtered = startQ;
          // return item.quizName === "ipl2023";
        } else if (subdomain === "abp") {
          let startQ = await getQuestions(null, null, null, true, "native");
          filtered = startQ;
          // return item.quizName === "native";
        } else if (defaultNewDomains.includes(subdomain)) {
          console.log("defaultnew domains fetch");
          let startQ = await getQuestions(null, null, null, true, "defaultnew");
          filtered = startQ;
          // return item.quizName === "defaultnew";
        } else if (subdomain === "harsh") {
          let startQ = await getQuestions(
            null,
            null,
            null,
            true,
            "HinduReligion"
          );
          filtered = startQ;
          // return item.quizName === "HinduReligion";
        } else if (subdomain === "mtnews24") {
          let startQ = await getQuestions(null, null, null, true, "infobidz");
          filtered = startQ;
        } else if (
          subdomain === "mathrubhumi" ||
          subdomain === "dainikamadershomoy"
        ) {
          console.log("cricket questions");
          let startQ = await getQuestions(null, null, null, true, "cricket");
          filtered = startQ;
        } else {
          console.log("inside subdomains condition");
          let startQ = await getQuestions(null, null, null, true, subdomain);
          filtered = startQ;
          // return item.quizName === subdomain;
        }

        if (subdomain === "kamal") {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        } else if (subdomain === "winacle" || subdomain === "lewishamilton") {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        } else if (
          subdomain === "lpbw1" ||
          subdomain === "sisterwives1" ||
          subdomain === "mtnews24"
        ) {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        } else if (
          defaultNewDomains.includes(subdomain) ||
          subdomain === "cricket" ||
          subdomain === "ecosoft1" ||
          subdomain === "dainikamadershomoy" ||
          subdomain === "mathrubhumi"
        ) {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        } else if (subdomain === "native" || subdomain === "abp") {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        } else {
          let random = getMultipleRandom(filtered, 2);
          setQData(random);
        }
      } else {
        let startQs = await getQuestions(null, null, null, true, subdomain);

        if (startQs.error) {
          toast.error(startQs.error.message, {
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
          let filtered = startQs.data.data.filter(
            (item) =>
              item.language !== "hindi" &&
              item.language !== "bengali" &&
              item.language !== "gujarati" &&
              item.language !== "image" &&
              item.language !== "tamil" &&
              item.language !== "marathi" &&
              item.language !== "chinese" &&
              item.language !== "spanish" &&
              item.language !== "Portuguese"
          );

          let random = getMultipleRandom(filtered, 2, true);

          setQData(random);
        }
      }
    };
    pullQuestions();
  }, []);
  // let subdomain = window.location.href.split("//")[1].split(".")[0];
  // if (subdomain === "soapopera") {
  //   subdomain = "soaps";
  // }
  // subdomain = "defaultnew";

  // let subdomain = window.location.href.split("//")[1].split(".")[0];
  // if (subdomain === "soapopera") {
  //   subdomain = "soaps";
  // }
  // subdomain = "defaultnew";
  useEffect(() => {
    if (
      sessionStorage.getItem("localCoins") == null &&
      sessionStorage.getItem("quizData") == null &&
      sessionStorage.getItem("userData") == null
    ) {
      checkPage();
      // console.log("checkpage function ran");
    }
  }, []);
  // useEffect(() => {
  //   const getdata = async () => {
  //     let res = await getUser();
  //     if (res.error == null) {
  //       dispatch(addUser(res.data.data));
  //       history.push("/home");
  //     }
  //   };
  //   getdata();
  // }, []);
  let fromLogin;
  if (props.location.state) {
    fromLogin = props.location.state;
    // console.log(fromResult.fromResult);
    // console.log("fromLogin", fromLogin)
  }

  const next = (key) => {
    let result = null;
    if (key == data.correct) {
      setCorrect(data.correct);
      setCorrectCount((prev) => prev + 1);
      result = true;
    } else {
      setCorrect(data.correct);
      setWrong(key);
      result = false;
    }
    setTimeout(() => {
      setAns(result);
    }, 1000);
  };
  let preload = true;
  // useEffect(() => {
  //   function getMultipleRandom(arr, num) {
  //     const shuffled = [...arr].sort(() => 0.5 - Math.random());
  //     return shuffled.slice(0, num);
  //   }
  //   let random = getMultipleRandom(defaultNewQuestions, 10)
  //   setQData(random);
  // }, []);

  useEffect(() => {
    // console.log("count--", count)
    if (
      (count >= qData?.lenght - 1 && subdomain === "cricketz") ||
      (count >= qData?.lenght - 1 && subdomain === "oportunidadesbrazil2") ||
      (count >= qData?.lenght - 1 && subdomain === "oportunidadesbrazil") ||
      (count >= qData?.lenght - 1 && subdomain === "oportunidadesbrazil1")
    ) {
      console.log("set modal open");
      setIsModalOpen(true);
      history.push("/home");
    } else {
      if (qData) setData(qData[count]);
    }
  }, [qData, count]);

  useEffect(() => {
    // if (count === 1) {
    //   const script2 = document.createElement("script");
    //   script2.async = true;
    //   script2.src =
    //     "https://www.googletagmanager.com/gtag/js?id=AW-10821409998";

    //   // Create a function to initialize gtag
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag() {
    //     window.dataLayer.push(arguments);
    //   }

    //   // Initialize gtag.js
    //   gtag("config", "AW-10821409998");

    //   // Append the script element to the document
    //   document.head.appendChild(script2);
    //   console.log("googletag2 code init");

    //   // Function to report conversion
    //   function googletag2_report_conversion() {
    //     console.log("googletag2 code inside");
    //     let callback = function () {
    //       // If needed, you can add code to handle the callback here
    //     };
    //     gtag("event", "conversion", {
    //       send_to: "AW-10821409998/JiptCLapzdgYEM65hqgo",
    //       event_callback: callback,
    //     });
    //     return false;
    //   }

    //   // Call the conversion function
    //   googletag2_report_conversion();
    // }
    if (count > 1) {
      // console.log("show ads called");
      // showAds();
      const script = document.createElement("script");
      script.text = `
          window.googletag = window.googletag || { cmd: [] };
      
          googletag.cmd.push(function () {
           
            // Define a web interstitial ad slot.
            let interstitialSlot = googletag.defineOutOfPageSlot(
              "/22082859479/quiztwiz_vignette",
              googletag.enums.OutOfPageFormat.INTERSTITIAL
            );
            interstitialSlot
                  .addService(googletag.pubads());
           
      
            // Slot returns null if the page or device does not support interstitials.
            if (interstitialSlot) {
              interstitialSlot
                .addService(window.googletag.pubads())
                .setConfig({
                  interstitial: {
                    triggers: {
                      unhideWindow: true,
                    },
                  },
                });
      
              // Add an event listener to handle when the slot loads
              window.googletag.pubads().addEventListener("slotOnload", function (event) {
                if (interstitialSlot === event.slot) {
                  console.log("Interstitial vignette is loaded.");
                }
              });
            }
            googletag.pubads().enableSingleRequest();
          googletag.enableServices();
          googletag.pubads().refresh([interstitialSlot]);
          });
        `;

      // Append the script to the head of the document
      document.head.appendChild(script);
      if (
        subdomain !== "cricketz" &&
        subdomain !== "opportunitiesbrazil" &&
        subdomain !== "oportunidadesbrasil1" &&
        subdomain !== "oportunidadesbrasil2"
      ) {
        setIsModalOpen(true);
      }
    }

    if (qData) setData(qData[count]);
  }, [count]);

  useEffect(() => {
    if (ans != null) {
      setCount((prev) => prev + 1);
      if (count === 0) {
        showAds();
      }
      if (count === 2) {
        trackEvent(
          "Question Played",
          "User Played 3rd question",
          "Played 3rd question"
        );
      }
      // console.log("question length", qData.length);?link=https://kloud.watch/76n47t6idnu4
      if (count >= qData.length - 1) {
        let guestCoins = { coins: correctCount * 50 };

        sessionStorage.setItem("localCoins", JSON.stringify(guestCoins));
        if (
          subdomain === "oportunidadesbrasil2" ||
          subdomain === "opportunitiesbrazil" ||
          subdomain === "oportunidadesbrasil1"
        ) {
          console.log("to home");
          history.push("/home");
        }
      }
      // if (count === 1 && window.location.hostname !== "localhost") {
      //   const dataLog = async () => {
      //     const res = await sendData();
      //     console.log("res", res);
      //   };
      //   dataLog();
      // }

      // if (count === 1) {
      //   if (cat === "t20") {
      //     history.push("/home/quizzes-play/T-20");
      //   } else {
      //     history.push("/home");
      //     // let routeData = { data: qData, count: 1 };
      //     // history.push("/question2", routeData);
      //   }
      //   sessionStorage.clear();
      //   let guestCoins = { coins: correctCount * 50 };
      //   // console.log(guestCoins);
      //   sessionStorage.setItem("localCoins", JSON.stringify(guestCoins));
      // } else {
      if (count >= 9) {
        // console.log("count greater than 8")
        history.push("/home");
      }
      setCount(count + 1);
    }
    setCorrect(null);
    setWrong(null);
    setAns(null);
  }, [ans]);

  const LoginEvent = () => {
    trackEvent("button", "Sign up from Starter", "Sign Up");
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.innerText = `window.unibots = window.unibots || { cmd: [] };
  //   unibots.cmd.push(()=>{ unibotsPlayer("soaps"); });`;

  //   document.getElementById("div-ub-soaps").append(script);
  //   console.log(document.getElementById("div-ub-soaps"));
  // }, []);

  // useEffect(() => {
  //   window.unibots = window.unibots || { cmd: [] };
  //   window.unibots.cmd.push(() => {
  //     window.unibotsPlayer("soaps");
  //   });
  // }, []);
  const closeModal = () => {
    setIsModalOpen(false);
    window.interstatialFired = true;
    if (cat !== "t20" && cat !== "football") {
      // let routeData = { data: qData, count: count, correct: correctCount };
      // history.push(`/question/1`, routeData);
      history.push("/playquiz");
    }
    // console.log("routeData--", routeData);
  };
  const updateUserRewardCoins = async () => {
    let newCoins = userData.user.coins + 100;
    const res = await updateUserCoins(userData.user.email, newCoins);
    console.log("response after watching add", res);
    dispatch(updateUserProfile(res.data.data));
  };
  const handleClaim = () => {
    // console.log("inside handle claim");
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
          window.interstatialFired = true;
          let routeData = {
            data: qData,
            count: count,
            correct: correctCount,
            claimedCoins: 0,
          };
          history.push({
            pathname: "/playquiz",
            state: { routeData },
          });
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
            // updateUserRewardCoins();
            window.interstatialFired = true;
            handleShowToast();
            let routeData = {
              data: qData,
              count: count,
              correct: correctCount,
              claimedCoins: 100,
            };
            sessionStorage.setItem("claimedCoins", JSON.stringify(100));
            setTimeout(() => {
              if (cat !== "t20" && cat !== "football") {
                // history.push(`/question/1`, routeData);
                history.push({
                  pathname: "/playquiz",
                  state: {
                    routeData: routeData, // Send routeData as a prop
                  },
                });
              }
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
            let routeData = {
              data: qData,
              count: count,
              correct: correctCount,
              claimedCoins: 0,
            };
            window.interstatialFired = true;
            setTimeout(() => {
              // history.push(`/question/1`, routeData);
              history.push({
                pathname: "/playquiz",
                state: {
                  routeData: routeData,
                },
              });
            }, 1500);
          }
          setIsModalOpen(false);
        },
      });

      // window.adConfig({
      //   preloadAdBreaks: "on",
      //   onReady: showAd,
      // });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
    setAdViewedComplete(true);
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

  function redirectCloud() {
    const link = `intent://${redirectLink}#Intent;scheme=kloudwatch;package=com.apparent.playwell;end`;

    // Redirect to the link
    window.location.href = link;
  }



  const checkAds = () => {
    fetch("http://localhost:8000/check-ads-btn")
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
};


  return (
    <>
      <ToastContainer
        toastClassName="my-toast-container-colored" // Use "my-toast-container-colored" for colored theme
        bodyClassName="my-toast-body-colored"
        theme="dark"
        // position="top-right"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
      {cat !== "t20" && (
        <RewardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onClaim={handleClaim}
          adViewedComplete={adViewedComplete}
        />
      )}
      {data && (
        <>
          {/* <AdContainerComponent /> */}

          <div className="text-white h-screen flex">
            <PopUp />

            <div className="max-w-[520px] scrollhide  lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 py-3 px-2 items-center  box-border">
              <div className="max-w-[480px] max-h-[320px] mobile-width">
                <GoogleAds
                  clientId={clientid}
                  startLoad={startLoad}
                  preload={preload}
                  fromLogin={fromLogin}
                  adSlot="start_inpage"
                />
              </div>
              {subdomain !== "monetix148" && <AnchorAd />}

              <div className="text-center font-bold text-18">
                {imageUrl &&
                  redirectLink &&
                  (subdomain === "kloudwatch" ||
                    subdomain === "kloudwatch2" ||
                    subdomain === "kloudwatch3") && (
                    <div onClick={redirectCloud}>
                      <img className="min-h-[200px]" src={imageUrl}></img>
                    </div>
                  )}
                <div className="flex gap-1 text-[12px] text-[#8789c3]">
                  Answer few questions and win
                  <img className="w-3 object-contain" src={Coin} alt="coins" />
                  150 free!
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => pushNotification()}
              >
                <img
                  className="w-[55px]"
                  src="https://unibots.b-cdn.net/quiz/images/quiztwiz_bell.gif"
                />
                {/* <IoIosNotifications className="text-4xl text-yellow-400" /> */}
              </div>
              <div className="w-3/5 min-h-[.1rem] mx-auto bg-gradient-to-r dark:from-[#40438000] dark:via-[#404380] dark:to-[#40438000]"></div>
              {/* <div className=" text-[#bac8ff] font-bold">
                Question {count + 1}
                <span className="text-[13px]">/{qData?.length}</span>
              </div> */}
              <div className="text-md font-bold px-10 text-center">
                {cat === "actor-bengal" ? (
                  <img className="w-[250px]" src={data?.question} alt="actor" />
                ) : (
                  <span>{data?.question}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 px-3 min-w-full mt-2">
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
                      onClick={async () => {
                        next(data);
                        await checkAds();
                    }}
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
              {subdomain !== "cricketz" && !redirectLink && (
                <div
                  className="text-[#ffcc5b] font-bold cursor-pointer flex"
                  onClick={() => LoginEvent()}
                >
                  {!isLoggedIn && (
                    <>
                      <p onClick={() => history.push("/signup")}>Sign-Up </p>
                      <p
                        className="pl-[6px]"
                        onClick={() => history.push("/login")}
                      >
                        or Login
                      </p>
                    </>
                  )}
                </div>
              )}

              {(subdomain === "kloudwatch" ||
                subdomain === "kloudwatch2" ||
                subdomain === "kloudwatch3") &&
                redirectLink && (
                  <div
                    className="bg-[#D8E91E] cursor-pointer mt-2 text-center  md:w-[100%] w-[50%] rounded-[1.5rem] text-black font-bold py-2 px-4 mr-2"
                    style={{
                      boxShadow:
                        "rgba(216, 233, 30, 0.9) 0px 10px 50px -20px, rgba(0, 0, 0, 0.9) 0px 20px 60px -30px",
                    }}
                    onClick={redirectCloud}
                  >
                    Open in watch out
                  </div>
                )}
              <div>
                {cat === "t20" && onMobile && (
                  <p
                    className="bg-blue-500 py-2 px-4 rounded-lg"
                    onClick={() => history.push(`/scorecard`)}
                  >
                    See Scorecard
                  </p>
                )}
              </div>
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
                  The insurance industry is one of the largest industries in the
                  United States, with over $1.5 trillion in annual premiums.The
                  word "insurance" comes from the French word "assurer", which
                  means "to make sure". The first insurance company in the
                  United States was founded in Charleston, South Carolina, in
                  1735.The insurance industry employs over 2 million people in
                  the United States. The average American household spends about
                  $1,500 per year on insurance premiums. The most expensive type
                  of insurance in the United States is long-term care insurance,
                  which can cost upwards of $5,000 per month.
                </p>
              </div>
              <div className="flex w-full border justify-center gap-4 text-left items-center p-4 rounded-lg ">
                <div className="flex-1">
                  Turn traffic into profit! Reach out for premium ads today!
                </div>
                <button
                  onClick={() => window.open("https://unibots.com/quiztwiz")}
                  class="w-[40%] md:w-[40%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] big:w-[30%] bg-blue-500 hover:bg-blue-700 text-white font-medium text-md py-2 px-4 rounded-full"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <SidePoster />
          </div>
        </>
      )}
    </>
  );
};

export default Starter;
