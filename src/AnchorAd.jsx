import React, { useEffect, useState } from "react";

const AnchorAd = () => {
  const [showAdDiv, setShowAdDiv] = useState(true);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  const handleClose = () => {
    setShowAdDiv(false);
  };

  useEffect(() => {
    const checkAdStatus = () => {
      // Select the <ins> element with the specified data-ad-slot attribute
      var insElement = document.querySelector('ins[data-ad-slot="7930715818"]');

      // Check if the element exists
      if (insElement) {
        // Get the value of the data-ad-status attribute using dataset
        var adStatus = insElement.dataset.adStatus;

        // If dataset doesn't work, try using getAttribute
        if (!adStatus) {
          adStatus = insElement.getAttribute("data-ad-status");
        }

        // Check if the ad status is unfilled or filled
        if (adStatus === "unfilled") {
          // setShowCloseBtn(true);
          console.log("Ad is unfilled");
        } else if (adStatus === "filled") {
          setShowCloseBtn(true);
          console.log("Ad is filled");
        } else {
          
          console.log("Ad status is unknown");
        }
      } else {
        console.log("Element not found");
      }
    };
    const pushAd = () => {
      const insElement = document.querySelector('ins[data-ad-slot="7930715818"]');
      if (insElement && !insElement.hasAttribute('data-ad-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
       
        // insElement.setAttribute('data-ad-pushed', 'true');
      }
    };
    // Function to observe changes in the DOM
    const observeDOM = () => {
      // Select the target node
      var targetNode = document.body;

      // Options for the observer (which mutations to observe)
      var config = { attributes: true, subtree: true };

      // Callback function to execute when mutations are observed
      var callback = function (mutationsList, observer) {
        // Check for changes in the <ins> elements
        mutationsList.forEach(function (mutation) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-ad-status"
          ) {
            checkAdStatus();
          }
        });
      };

      // Create an observer instance linked to the callback function
      var observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    };

    // Call the functions to start checking for ad status and observing DOM mutations
    checkAdStatus();
    pushAd()
    observeDOM();
  }, []); // Empty dependency array ensures the effect runs only once

 
  return (
    showAdDiv && (
      <div
        id="ub-anchor-adcontainer"
        className="shadow-md fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 text-center"
      >
        {showCloseBtn && (
          <span
            className="close_ub bg-white px-[5px] absolute top-[-20px]   left-0 text-black pointer-events-all w-30 font-bold text-xl   rounded-tr-xl cursor-pointer"
            onClick={handleClose}
          >
            x
          </span>
        )}
        <div className="ub-anchor max-w-max z-50 py-1">
          <ins
            className="adsbygoogle"
            
            style={{ display: "block", width: "320px", height: "50px" }}
            data-ad-client="ca-pub-5761017298734489"
            data-ad-slot="7930715818"
            data-auto-ad-size="false"
            // data-full-width-responsive="false"
          ></ins>
        </div>
      </div>
    )
  );
};

export default AnchorAd;