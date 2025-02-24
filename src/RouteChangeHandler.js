import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdContainerComponent from "./AdContainerComponent";

const RouteChangeHandler = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      console.log("Route changed");
    });

    return () => {
      unlisten(); // Clean up the listener when the component unmounts
    };
  }, [history]);

  return (
    <>
      <AdContainerComponent />
    </>
  ); // Render the child components
};

export default RouteChangeHandler;
