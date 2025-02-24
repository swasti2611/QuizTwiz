import React, { useEffect, useState } from "react";

const AdContainerComponent = () => {
  const adsArray = [
    "/21928950349/default.quiztwiz_320x50_anchor",
    "/22082859479/defaultnew.quiztwiz_anchor_320x50",
  ];
  const middle = [
    "/21928950349/default.quiztwiz_middle_320x100",
    "/22082859479/defaultnew.quiztwiz_middle_320x100",
  ];
  var ub_anchor;
  let runScript = true;
  let anchortag;
  let middletag;
  let middleId;
  console.log("inside ad container");
  let url = window.location.href;
  let adtag = adsArray[0];
  switch (true) {
    case /\/question\/1/.test(url):
      console.log("inside question 1");
      adtag = adsArray[1];
      middletag = middle[1];
      middleId = "div-gpt-ad-1688709050644-1";
      anchortag = `ub-anchor-1`;
      break;
    case /\/question\/2/.test(url):
      console.log("inside question 2");
      adtag = adsArray[0];
      anchortag = `ub-anchor-2`;
      middletag = middle[0];
      middleId = "div-gpt-ad-1688709050644-2";
      break;
    case /\/question\/3/.test(url):
      console.log("inside question 3");
      runScript = false;
      break;
    case /\/question\/4/.test(url):
      console.log("inside question 4");
      adtag = adsArray[1];
      anchortag = `ub-anchor-3`;
      middletag = middle[1];
      middleId = "div-gpt-ad-1688709050644-3";
      break;
    case /\/question\/5/.test(url):
      adtag = adsArray[0];
      anchortag = `ub-anchor-4`;
      middletag = middle[0];
      middleId = "div-gpt-ad-1688709050644-4";
      break;
    case /\/question\/6/.test(url):
      runScript = false;
      break;
    case /\/question\/7/.test(url):
      adtag = adsArray[1];
      anchortag = `ub-anchor-5`;
      middletag = middle[1];
      middleId = "div-gpt-ad-1688709050644-5";
      break;
    case /\/question\/8/.test(url):
      adtag = adsArray[0];
      anchortag = `ub-anchor-6`;
      middletag = middle[0];
      middleId = "div-gpt-ad-1688709050644-6";
      break;
    case /\/question\/9/.test(url):
      runScript = false;
      break;
    case /\/question\/10/.test(url):
      adtag = adsArray[1];
      anchortag = `ub-anchor-7`;
      middletag = middle[1];
      middleId = "div-gpt-ad-1688709050644-7";
      break;

    default:
      adtag = adsArray[0];
      anchortag = `ub-anchor-8`;
      middletag = middle[0];
      middleId = "div-gpt-ad-1688709050644-8";
  }

  useEffect(() => {
    if (runScript) {
      const script = document.createElement("script");
      console.log("adtag for question", adtag);
      script.innerHTML = `
      // const ub_directstyleSheet = ".ub-anchor-adcontainer{display:none;width:max-content;text-align:center;background:#fff;position:fixed !important;bottom:0;left: 50%;box-shadow:0 -3px 3px rgba(0,0,0,.2)!important;z-index:2147483646;transform: translate(-50%);} .ub-anchor{width:100%;z-index:2147483647;padding-top:4px;cursor: pointer;} .close_ub-anchor{position:absolute;top:-20px;background:#fff;color:#000;left:0px;pointer-events:all;height:20px;z-index:21474836467;width:30px;font-size:26px;line-height:23px;box-shadow:0 -3px 3px rgba(0,0,0,.2)!important;border-radius:2px 10px 0 0;}";
      // const ubcss = document.createElement("style");
      // ubcss.appendChild(document.createTextNode(ub_directstyleSheet));
      // document.getElementsByTagName("head")[0].appendChild(ubcss);

      document.querySelector(".close_ub-anchor").onclick = () => {
        document.getElementById("ub-anchor-adcontainer").style.display = "none";
      };

      window.googletag = window.googletag || { cmd: [] };
      
      googletag.cmd.push(function () {
        // if (!googletag.pubads().getSlots().some(slot => slot.getSlotElementId() === 'ub-anchor')) {
        ub_anchor = googletag.defineSlot(
          '${adtag}',[320, 50],
          '${anchortag}'
          )
          .addService(googletag.pubads());
          ub_middle = googletag.defineSlot(
            '${middletag}', [320, 100], '${middleId}'
          )
          .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.pubads().refresh([ub_anchor,ub_middle]);
        // googletag.display(${anchortag});
        googletag.pubads().addEventListener("impressionViewable", (event) => {
          setInterval(() => {
            googletag.pubads().refresh([${anchortag}, ${middletag}]);
          }, 30000);
        });
        googletag.pubads().addEventListener("slotRenderEnded", (event) => {
          console.log("slot render init");
          if (
            !event.isEmpty &&
            event.slot.getSlotId().getDomId() === '${anchortag}'
          ) {
            console.log(
              "slot render init 2",
              document.getElementById("ub-anchor-adcontainer")
            );
            document.getElementById("ub-anchor-adcontainer").style.display =
              "block";
            document.querySelector(".close_ub-anchor").style.display = "block";
          }
        });
      // }
      });
    `;
      console.log("doc body", document.body);
      console.log("script", script);
      // document.body.appendChild(script);
      document.getElementsByTagName("body")[0].appendChild(script);
      console.log("script appending on route change");

      return () => {
        console.log("destroy call");
        console.log("ub_anchor", ub_anchor);
        window.googletag.destroySlots([ub_anchor]);
        document.querySelector(".ub-anchor").innerText = "";
        document.querySelector(".ub_middle").innerText = "";
        document.body.removeChild(script);
      };
    } else {
      console.log("script ran for", window.location.href);
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1203149545224208";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [runScript]);

  return (
    <div id="ub-anchor-adcontainer" className="ub-anchor-adcontainer">
      <span className="close_ub-anchor">x</span>
      <div
        className="ub-anchor"
        id={anchortag}
        align="center"
        style={{ position: "relative" }}
      >
        {!runScript && (
          <ins
            className="adsbygoogle"
            style={{ display: "inline-block", width: "320px", height: "50px" }}
            data-ad-client="ca-pub-1203149545224208"
            data-ad-slot="9534197632"
          ></ins>
        )}
      </div>
    </div>
  );
};

export default AdContainerComponent;
