import ReactGA from "react-ga4";

const useAnalyticsEventTracker = () => {
  const eventTracker = (category, action, label) => {
    console.log(label);
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
