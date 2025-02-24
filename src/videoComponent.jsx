import React, { useEffect, useRef } from "react";

const VideoComponent = () => {
  //   let ubpl = useRef(null);
  // console.log("inside video component");
  const scriptRef = useRef(null);
  useEffect(() => {
    <script async src="https://cdn.unibotscdn.com/ubplayer/player.js"></script>;
    const playerScript = document.createElement("script");
    playerScript.src = "https://cdn.unibotscdn.com/ubplayer/player.js";
    playerScript.async = true;
    // document.getElementsByTagName("head")[0].appendChild(playerScript);
    // playerScript.onload = function () {
    //   ubpl.current = window.videojs;
    //   console.log("videojs", window.videojs);
    // };
    const script = document.createElement("script");
    script.innerHTML = `
      window.unibots = window.unibots || { cmd: [] };
      unibots.cmd.push(() => { unibotsPlayer("quiztwiz"); });
    `;
    scriptRef.current = script;
    document
      .getElementById("div-ub-quiztwiz")
      .insertAdjacentElement("beforebegin", playerScript);
    document.getElementById("div-ub-quiztwiz").appendChild(scriptRef.current);

    // return () => {
    //   if (scriptRef.current) {
    //     scriptRef.current.remove();
    //   }
    // };
  }, []);

  return <div id="div-ub-quiztwiz" />;
};

export default VideoComponent;
