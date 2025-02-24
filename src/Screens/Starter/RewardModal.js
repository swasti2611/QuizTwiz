import React, { useState } from "react";
const getReward = "https://playerstorage.b-cdn.net/quiztwiz/assets/getreward.gif";
const afterReward = "https://playerstorage.b-cdn.net/quiztwiz/assets/rewarded.gif";
const RewardModal = ({ isOpen, onClose, onClaim, adViewedComplete }) => {
  const [claimText, setClaimText] = useState("Claim 100 coins");

  const handleClaim = () => {
    onClaim();
    setClaimText("Coins claimed!");
    // Additional logic for claiming coins can be added here
  };

  return (
    <div
      className={`fixed modal z-50 inset-0 flex items-center  justify-center w-[100%] ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative flex bg-[#111827] border-2 border-white text-white flex-col justify-center items-center mx-4  p-8  rounded-[1.5rem] lg:w-full w-[40%]">
        <button
          className="absolute top-0 right-0 m-4 text-white-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {!adViewedComplete ? (
          <>
            <img src={getReward} alt="reward logo" loading="lazy" />

            <h2 className="text-2xl mb-4 text-[#D8E91E]">
              New Reward Available
            </h2>
            <h2 className="text-4xl md:text-[1.5rem] mb-4">
              Get Instant 100 Coins!
            </h2>
            <p className="mb-6 text-[#8E8F98]">
              Watch a simple ad and get rewarded
            </p>

            <button
              className="bg-[#D8E91E]   md:w-[100%] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2"
              style={{
                boxShadow:
                  "rgba(216, 233, 30, 0.9) 0px 10px 50px -20px, rgba(0, 0, 0, 0.9) 0px 20px 60px -30px",
              }}
              onClick={handleClaim}
            >
              Claim
            </button>
          </>
        ) : (
          <>
            <img src={afterReward} alt="rewarded" />
            <h2 className="text-4xl md:text-[1.5rem] mb-4">
              100 Coins Rewarded!
            </h2>
          </>
        )}
        {/* <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Skip
          </button> */}
      </div>
    </div>
  );
};

export default RewardModal;
