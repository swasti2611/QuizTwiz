const LoadScript = (client, subdomain, pubId, callback) => {
  console.log(client);
  const existingScript = document.getElementById("googleAdSense");
  if (!existingScript) {
    const script = document.createElement("script");
    // console.log(pubId );
    if (pubId) {
      var meta = document.createElement("meta");
      meta.name = "google-adsense-platform-account";
      meta.content = "ca-host-pub-1203149545224208";
      document.getElementsByTagName("head")[0].appendChild(meta);

      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${
        pubId ? pubId : 1203149545224208
      }&host=ca-host-pub-1203149545224208`;
    } else {
      if (subdomain === "arealnews") {
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5761017298734489`;
      } else {
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5761017298734489`;
      }
    }
    // console.log(script.src);
    script.id = "googleAdSense";
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("data-ad-frequency-hint", "30s");
    // script.setAttribute("data-adbreak-test", "on");
    script.setAttribute("data-ad-channel", `${client}`);
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default LoadScript;
