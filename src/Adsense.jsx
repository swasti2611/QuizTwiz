import React, { useEffect } from "react";

const Adsense = () => {
  useEffect(() => {
    console.log("script ran for", window.location.href);
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1203149545224208";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div id="ub-anchor-adcontainer" className="ub-anchor-adcontainer">
      <span className="close_ub-anchor">x</span>
      <div
        className="ub-anchor"
        id="ub-anchor"
        align="center"
        style={{ position: "relative" }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "320px", height: "50px" }}
          data-ad-client="ca-pub-1203149545224208"
          data-ad-slot="9534197632"
        ></ins>
      </div>
    </div>
  );
};

export default Adsense;
