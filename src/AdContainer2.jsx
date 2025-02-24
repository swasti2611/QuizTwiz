import React, { useEffect } from "react";

const AdContainer2 = () => {
  var ub_anchor;
  useEffect(() => {
    const script = document.createElement("script");
    console.log("adcontainer 2");
    script.innerHTML = `
      document.querySelector(".close_ub-anchor").onclick = () => {
        document.getElementById("ub-anchor-adcontainer").style.display = "none";
      };

      window.googletag = window.googletag || { cmd: [] };
     
      googletag.cmd.push(function () {
        // if (!googletag.pubads().getSlots().some(slot => slot.getSlotElementId() === 'ub-anchor')) {
        ub_anchor = googletag.defineSlot(
          '/22082859479/defaultnew.quiztwiz_anchor_320x50', [320, 50], 'ub-anchor-1'
          )
          .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        // googletag.pubads().refresh([ub_anchor]);
        googletag.display("ub-anchor-1");
        googletag.pubads().addEventListener("impressionViewable", (event) => {
          setInterval(() => {
            googletag.pubads().refresh([ub_anchor-1]);
          }, 30000);
        });
        googletag.pubads().addEventListener("slotRenderEnded", (event) => {
          console.log("slot render init");
          if (
            !event.isEmpty &&
            event.slot.getSlotId().getDomId() === "ub-anchor-1"
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

    document.body.appendChild(script);
    console.log("script appending on route change");

    return () => {
      document.body.removeChild(script);
      window.googletag.destroySlots([ub_anchor]);
    };
  }, []);

  return (
    <div id="ub-anchor-adcontainer" className="ub-anchor-adcontainer">
      <span className="close_ub-anchor">x</span>
      <div
        className="ub-anchor"
        id="ub-anchor"
        align="center"
        style={{ position: "relative" }}
      ></div>
    </div>
  );
};

export default AdContainer2;
