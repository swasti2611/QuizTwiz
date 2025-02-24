import React from "react";
import NavBar from "../../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import SideScoreBoard from "../../SidePoster/SideScoreBoard";
function FullScoreCard() {
  let history = useHistory();
  let fullScore = true;

  return (
    <div className="min-w-[520px] text-white max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border bg-bg">
      <NavBar />
      <SideScoreBoard fullScore={fullScore} />
      <button
        type="button"
        class="inline-block px-6 py-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out "
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
    </div>
  );
}

export default FullScoreCard;
