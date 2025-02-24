import React, { useEffect, useState, useRef } from "react";

function PopUp() {
  const [adLoaded, setAdLoaded] = useState(false);
  const [showad, setShowAd] = useState(true);
  const [insTagRendered, setInsTagRendered] = useState(false);
  const [insAd, setInsAd] = useState(null);
  const [insElement, setInsElement] = useState(false);
  const adElementRef = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    // script.onload = () => {
    //   // Set adLoaded to true
    //   setTimeout(() => {
    //     setAdLoaded(true);
    //   }, [3000]);
    // };
    script.onerror = () => {
      // Handle error
    };

    document.body.appendChild(script);
    window.addEventListener("load", handleAdLoad);
    const adElement = document.createElement("ins");
    adElement.className = "adsbygoogle";
    adElement.style.display = "block";
    adElement.id = "popAdGoogle";
    adElement.setAttribute("data-ad-client", "ca-pub-5761017298734489");
    adElement.setAttribute("data-ad-slot", "5464835589");
    adElement.setAttribute("data-ad-format", "auto");
    adElement.setAttribute("data-ad-size", "auto");
    adElement.setAttribute("data-full-width-responsive", "true");
    adElementRef.current = adElement;
    // setInsAd(adElement);
    // setInsElement(true);
    // const popupContent = document.querySelector(".ub-popupcontent");
    // if (popupContent) {
    //   setAdLoaded(true);
    //   popupContent.appendChild(adElement);

    //   // document.querySelector(".ub-popup-ad-container").style.display = "flex";
    // } else {
    //   console.error("Container element not found.");
    // }
    // setTimeout(() => {
    //   const popupContent = document.querySelector(".ub-popupcontent");
    //   if (popupContent) {
    //     setAdLoaded(true);
    //     popupContent.appendChild(adElement);
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    //     // document.querySelector(".ub-popup-ad-container").style.display = "flex";
    //   } else {
    //     console.error("Container element not found.");
    //   }
    // }, 1000);
    const intervalId = setInterval(() => {
      checkAdvertisementStatus(intervalId);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const handleAdLoad = () => {
    setAdLoaded(true);
    // setTimeout(() => {
    //   setAdLoaded(true);
    // }, [2000]);
  };

  const handleClose = () => {
    console.log("handle close called");
    setShowAd(false);
  };
  function checkAdvertisementStatus(intervalId) {
    // Check for the popup content container
    const popupContent = document.querySelector(".ub-popupcontent");
    const popupAdContainer = document.querySelector(".ub-popup-ad-container");
    if (adElementRef.current && !popupContent.contains(adElementRef.current)) {
      popupContent.appendChild(adElementRef.current);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Ad element appended.");
      setTimeout(() => {
        popupAdContainer.style.display = "flex";
        popupAdContainer.style.visibility = "visible";
        popupContent.style.display = "flex";
        popupAdContainer.style.backdropFilter = "blur(5px)";
      }, 500);
    }
    if (popupContent) {
      // Append the ad element if not already appended

      // Check advertisement status
      const insElement = document.querySelector(
        'ins[data-ad-slot="5464835589"]'
      );
      if (insElement) {
        const adsbygoogleStatus = insElement.getAttribute(
          "data-adsbygoogle-status"
        );
        const adfill = insElement.getAttribute("data-ad-status");
        console.log("Ad Status:", adsbygoogleStatus, "Ad Fill:", adfill);

        if (adsbygoogleStatus === "done" && adfill === "unfilled") {
          // (window.adsbygoogle = window.adsbygoogle || []).push({});

          // if (popupAdContainer) {
          //   popupAdContainer.style.display = "flex";
          //   popupAdContainer.style.visibility = "visible";
          //   popupContent.style.display = "flex";
          //   popupAdContainer.style.backdropFilter = "blur(5px)";
          // }

          // Stop the interval after the ad is processed
          handleClose();
          clearInterval(intervalId);

          console.log("Ad processing complete, interval cleared.");
        }
      } else {
        console.log("Ad slot not found yet.");
      }
    } else {
      console.log(".ub-popupcontent not yet created.");
    }
  }

  return (
    showad && (
      <>
        <div className="ub-popup-ad-container">
          <div className="ub-popupcontent">
            <div className="close_ub-popup" onClick={handleClose}>
              &#x78;
            </div>
            {/* <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-5761017298734489"
              data-ad-slot="5464835589"
              data-ad-format="auto"
              data-ad-size="auto"
              data-full-width-responsive="true"
            /> */}
          </div>
        </div>
      </>
    )
  );
}

export default PopUp;
