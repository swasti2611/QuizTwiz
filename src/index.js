import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Provider } from "react-redux";
import store from "./store";
import GlobalStateStore from "./GlobalState";
import "./index.scss";
import VideoComponent from "./videoComponent";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={GlobalStateStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
