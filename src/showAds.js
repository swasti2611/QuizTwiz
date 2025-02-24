let isInitialized = false;

export default function showAds() {
  // Only set up the configuration once
  if (!isInitialized) {
    // Define adBreak function if it doesn't exist
    if (!window.adBreak) {
      window.adBreak = function (o) {
        window.adsbygoogle.push(o);
      };
    }

    // Define adConfig function if it doesn't exist
    if (!window.adConfig) {
      window.adConfig = function (o) {
        window.adsbygoogle.push(o);
      };
    }

    // Setup the ad configuration only once
    window.adConfig({
      preloadAdBreaks: "on",
      onReady: showAd,
    });

    isInitialized = true;
  }

  // This function can be called multiple times safely
  function showAd() {
    window.adBreak({
      type: "browse",
      name: "browse",
    });
  }

  // We can still trigger showAd() on each component call
  showAd();
}
