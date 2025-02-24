import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const GoogleAds = (props) => {
  // console.log(clientId);

  // clientId,
  // preload,
  // startLoad,
  // path,
  // fromResult,
  // fromLogin,
  // fromNav,

  // const [pubId, setPubId] = useState();
  // useEffect(() => {
  //   // let showAd = () => {
  //   //   console.log("show Ad preload run");
  //   //   window.adBreak({
  //   //     type: "browse",
  //   //     name: "browse",
  //   //   });
  //   // };
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   window.adConfig = function (o) {
  //     console.log("inside ad config fn");
  //     window.adsbygoogle.push(o);
  //   };
  //   window.adBreak = function (o) {
  //     console.log("inside adBreak fn");
  //     window.adsbygoogle.push(o);
  //   };

  //   if (preload && !fromLogin) {
  //     console.log("Playing from starter page");
  //     // window.adConfig({
  //     //   preloadAdBreaks: "on",
  //     //   onReady: showAd,
  //     // });
  //   } else if (
  //     !startLoad &&
  //     path === "/home" &&
  //     !fromResult &&
  //     !fromLogin &&
  //     !fromNav
  //   ) {
  //     console.log("playing from GameList Page");
  //     // window.adConfig({
  //     //   preloadAdBreaks: "on",
  //     //   onReady: showAd,
  //     // });
  //   } else {
  //     console.log("inside else condition");
  //     // showAd();
  //   }

  //   // if (!window.adsbygoogle?.loaded) {
  //   //     window.adConfig({
  //   //         preloadAdBreaks: 'on',
  //   //         onReady: showAd
  //   //     });
  //   // }
  //   // else {
  //   //     showAd();
  //   // }
  //   // const scriptLoad = async () => {
  //   //     let data = await axios.get("https://cdn.unibots.in/quiz/quiz_new.json");
  //   //     let subdomain = window.location.host.split(".")[0];
  //   //     let client = data.data[subdomain];
  //   //     client = client ? client : data.data["default"];
  //   //     if (client.pubid) {
  //   //       setPubId(client.pubid);
  //   //     }
  //   //   };
  //   //   scriptLoad();
  // }, []);

  // let pubId = clientId?.pubId ? clientId.pubId : "1203149545224208";
  // let subdomain = window.location.href.split("//")[1].split(".")[0];
  // let pubId = "1203149545224208";
  // if (subdomain === "arealnews") {
  //   pubId = "5761017298734489";
  // }
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});

    if (props.adSlot === "start_inpage") {
      // Define a function to check the status of the advertisement
function checkAdvertisementStatus() {
  // Find the <ins> element with data-ad-slot="4080422259"
  const insElement = document.querySelector('ins[data-ad-slot="4080422259"]');
  
  // Check if the <ins> element exists and has the data-adsbygoogle-status attribute
  if (insElement ) {
    // Extract the value of the data-adsbygoogle-status attribute
    const adsbygoogleStatus = insElement.getAttribute('data-adsbygoogle-status');
    
    // Check the value of the attribute
    if (adsbygoogleStatus === 'done') {
      console.log('Advertisement is done loading.');
      
      // Clear the interval as the advertisement is loaded
      console.log("clear interval")
      clearInterval(intervalId);
    } else {
      console.log('Advertisement is still loading or has not been filled.');
      
    }
  } else {
    console.log('The <ins> element with data-ad-slot="4080422259" was not found or does not have the data-adsbygoogle-status attribute.');
  }
}

// Check the advertisement status every second
const intervalId = setInterval(checkAdvertisementStatus, 1000);


    }
  }, []);
  // console.log("props", props);
  let adSlot;
  if (props.adSlot === "start_inpage") {
    adSlot = "4080422259";
  } else if (props.adSlot === "start_2_inpage") {
    adSlot = "2384197200";
  } else if (props.adSlot === "home_inpage") {
    adSlot = "2339911275";
  } else if (props.adSlot === "ingame") {
    adSlot = "6823788052";
  } else if (props.adSlot === "endscreen_inpage") {
    adSlot = "6384804351";
  } else if (props.adSlot === "profile") {
    adSlot = "7026149798";
  } else if (props.adSlot === "category") {
    adSlot = "5713068129";
  } else if (props.adSlot === "email_login") {
    adSlot = "5816782279";
  }

  return (
    <ins
      className="adsbygoogle max-w-[480px]"
      style={{ display: "block", width: "480px", height: "320px" }}
      data-ad-client="ca-pub-5761017298734489"
      // data-ad-host="ca-host-pub-1203149545224208"
      data-ad-slot={adSlot}
      // data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

// ca-host change to ca-pub, arealnews.quiztwiz.com

export default GoogleAds;
