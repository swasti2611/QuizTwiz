import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const scoreImg = "https://playerstorage.b-cdn.net/quiztwiz/assets/scorecard_bg-min.jpg";

// import deskScoreImg from "https://playerstorage.b-cdn.net/quiztwiz/assets/background_quiz-min.jpg";
const loadinggif = "https://playerstorage.b-cdn.net/quiztwiz/assets/loadingani.gif";
import SideScoreBoard from "./SideScoreBoard";
const SideScore = () => {
  let { cat } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const history = useHistory();
  const liveMatch = useRef(false);
  let teams = [];
  for (const p of searchParams) {
    teams.push(p[1]);
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState(null);
  const [completedData, setcompletedData] = useState(null);
  const [upcoming, setUpComing] = useState([]);

  const getDateAndTime = (startDateTime) => {
    startDateTime = String(startDateTime - 17000);
    const year = startDateTime?.slice(0, 4);
    const month = parseInt(startDateTime?.slice(4, 6));
    const day = startDateTime?.slice(6, 8);
    let hour = parseInt(startDateTime?.slice(8, 10));
    const minute = startDateTime?.slice(10, 12);
    let amPm;
    if (hour > 12) {
      hour -= 12;
      amPm = "PM";
    } else if (hour === 12) {
      amPm = "PM";
    } else if (hour === 0) {
      hour = 12;
      amPm = "AM";
    } else {
      amPm = "AM";
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const convertedDateTime = `${
      monthNames[month - 1]
    } ${day}, ${year} ${hour}:${minute} ${amPm}`;
    return convertedDateTime;

    // let startTime;
    // let startDate =
    //   match_startDateTime.substring(6, 8) +
    //   "-" +
    //   match_startDateTime.substring(4, 6) +
    //   "-" +
    //   match_startDateTime.substring(0, 4);
    // if (match_startDateTime.substring(10, 12) === "60") {
    //   startTime =
    //     parseInt(match_startDateTime.substring(8, 10)) + 1 + ":" + "00";
    // } else {
    //   startTime =
    //     match_startDateTime.substring(8, 10) +
    //     ":" +
    //     match_startDateTime.substring(10, 12);
    // }
    // let matchTime = startDate + "," + startTime;

    // return matchTime;
  };

  useEffect(() => {
    const schedule = async () => {
      const upcoming = await fetch("https://cricket.unibots.in/get_score");
      let res = await upcoming.json();
      // console.log(res);
      let arr = [];
      res.data.map((item) => {
        if (item.length > 0) {
          item.map((detail) => {
            if (detail.matchStatus === "UPCOMING") {
              if (arr.length < 1) {
                arr.push(item);
              }
            }
          });
        }
      });

      setUpComing(arr);
    };
    schedule();
  }, []);

  useEffect(() => {
    const comp = async () => {
      const res = await fetch("https://cricket.unibots.in/get_scorecard");
      const result = await res.json();

      if (result.data[0].data.EpsL === "Finished") {
        setcompletedData(result.data[0].data);
      } else if (result.data[0].match_data.EpsL === "Finished") {
        setcompletedData(result.data[0].match_data);
      } else if (result.data[0].match_data.status === "Finished") {
        setcompletedData(result.data[0].match_data);
      }
    };
    comp();
  }, []);

  useEffect(() => {
    const mathData = async () => {
      let score = await fetch("https://cricket.unibots.in/get_score");
      let res = await score.json();

      setLoading(false);
      setData(res.data);
    };
    mathData();
    const intervalCall = setInterval(mathData, 10000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  let teamsPlaying = {
    AFG: "AFG",
    AUS: "AUS",
    BAN: "BAN",
    ENG: "ENG",
    IND: "IND",
    IRE: "IRE",
    NAM: "NAM",
    NED: "NED",
    NZ: "NZ",
    PAK: "PAK",
    SCO: "SCO",
    SA: "SA",
    SL: "SL",
    UAE: "UAE",
    WI: "WI",
    ZIM: "ZIM",
    CHE: "CHE",
    DEL: "DEL",
    GUJ: "GUJ",
    KOL: "KOL",
    LUC: "LUC",
    MUB: "MUB",
    PUN: "PUN",
    RAJ: "RAJ",
    ROY: "ROY",
    SUN: "SUN",
  };

  // console.log(data);
  const currentTeam = () => {
    const res = liveData.currentTeam;
    let currentTeam = "";
    for (const key in teamsPlaying) {
      if (key == res) {
        currentTeam += teamsPlaying[key];
      }
    }
    return currentTeam;
  };
  const liveDatatitle = () => {
    const res = liveData.title.split(" vs ");

    let currentTeam = [];

    for (const key in teamsPlaying) {
      if (key == res[0]) {
        currentTeam.push(teamsPlaying[key]);
      }
    }
    currentTeam.push("vs");
    for (const key in teamsPlaying) {
      if (key == res[1]) {
        currentTeam.push(teamsPlaying[key]);
      }
    }

    let finalTeams = currentTeam.join(" ");

    return finalTeams;
  };

  useEffect(() => {
    // console.log(data);
    if (data) {
      data.map((match, i) => {
        // console.log(match);
        if (match[0]?.matchStatus === "LIVE") {
          setLiveData(match[0]);
          liveMatch.current = true;
        }
        // else if (match[0]?.matchStatus === "COMPLETED") {
        //   // console.log("completed");
        //   // console.log(match[0]);
        //   setcompletedData(match[0]);
        //   liveMatch.current = false;
        // }
        // else if (match[0]?.matchStatus === "UPCOMING") {
        //   let upArr = [];
        //   match.map((item) => {
        //     upArr.push(item);
        //   });
        //   setUpComing(upArr);
        //   liveMatch.current = false
        //   // console.log("upcoming");
        //   // console.log(match[i]);
        // }
      });
    }
  }, [data]);
  // console.log(completedData);
  // console.log(liveData);
  // console.log(upcoming);
  const completedTeam1 = () => {
    let res = completedData.homeTeam;
    // console.log("check scec", completedData?.T1[0]?.Abr);

    let currentTeam = "";
    for (const key in teamsPlaying) {
      if (key == res) {
        currentTeam += teamsPlaying[key];
      }
    }
    return res;
  };

  const completedTeam2 = () => {
    let res = completedData.awayTeam;
    // console.log(res=completedData?.T2[0]?.Abr)
    let currentTeam = "";
    for (const key in teamsPlaying) {
      if (key == res) {
        currentTeam += teamsPlaying[key];
      }
    }
    // return currentTeam;
    return res;
  };

  return (
    <>
      {!completedData && !liveData && (
        <h1 className="text-white">Match Data Unavaliable</h1>
      )}

      {loading && (
        <div className="flex flex-col justify-center align-center h-screen w-[80%]">
          <div className="flex justify-center">
            <img
              className="object-contain h-48 w-96"
              src={loadinggif}
              alt="loading quiz"
            />
          </div>
          <div className="flex justify-center">
            <h1 className="text-white text-[24px]">Loading Match Score</h1>
          </div>
        </div>
      )}
      {liveData ? (
        <div className="text-white w-full h-screen flex  overflow-hidden">
          <div className="min-w-[520px] w-[100%] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border">
            <div
              className="px-5 pt-[1rem] flex flex-col w-[100%] gap-2 h-auto"
              style={{
                background: `url(${scoreImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "inter",
                backgroundPosition: "center",
              }}
            >
              <div className="">
                <h3 className="text-red-600 font-bold text-[14px] italic">
                  Live Score
                </h3>
                <h1 className="font-bold text-[24px] italic">
                  {liveDatatitle()}
                </h1>
                <p className="font-light text-gray-300">
                  {liveData.summaryText}
                </p>
                <p className="font-light text-gray-300">
                  {liveData.awayScore !== "none" ? liveData.awayScore : ""}
                </p>
                <p className="font-bold text-[20px]">
                  {currentTeam()} {liveData.currentScore}{" "}
                  <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                    ({liveData.currentOvers} overs)
                  </span>
                </p>
              </div>
              <div className="justify-center m-auto flex backdrop-blur-md bg-black/10 p-6 rounded-lg w-[100%]">
                <div className="w-[100%] flex">
                  {/* batsman */}
                  <table>
                    <thead>
                      <tr className="table-headers">
                        <th>Batter</th>
                        <th>R</th>
                        <th>B</th>
                        {/* <th>4s</th>
                      <th>6s</th>
                      <th>SR</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{liveData.currentBatsmen[0]}</td>
                        <td>{liveData.currentBatsmenRuns[0]}</td>
                        <td>{liveData.currentBatsmenBalls[0]}</td>
                        {/* <td>10</td>
                      <td>10</td>
                      <td>500</td> */}
                      </tr>
                      <tr>
                        <td>{liveData.currentBatsmen[1]}</td>
                        <td>{liveData.currentBatsmenRuns[1]}</td>
                        <td>{liveData.currentBatsmenBalls[1]}</td>
                        {/* <td>4</td>
                      <td>0</td>
                      <td>100</td> */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-[2rem] h-[2rem]"></div>
                  {/* bowler */}
                  <table style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                      <tr className="table-headers">
                        <th>Bowler</th>
                        <th>O</th>
                        <th>M</th>
                        <th>R</th>
                        <th>W</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{liveData.currentBowler}</td>
                        <td>{liveData.currentBowlerOvers}</td>
                        <td>{liveData.currentBowlerMaidens}</td>
                        <td>{liveData.currentBowlerRuns}</td>
                        <td>{liveData.currentBowlerWickets}</td>
                      </tr>
                      {/* <tr>
                    <td>Deep</td>
                    <td>2</td>
                    <td>0</td>
                    <td>9</td>
                    <td>3</td>
                    <td>4.5</td>
                  </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <p className="underline italic text-center text-[14px]">
                View Complete ScoreCard
              </p> */}
              {/* add */}

              {/* <div className="flex flex-col justify-center gap-2">
                <button
                className="rounded-full px-7 py-2 w-[80%] m-auto text-[1.5rem]"
                style={{ background: "#111827", border: "1px solid white" }}
                onClick={handleClick}
                >
                Play T20 Quiz!
                </button>
                <p className="text-center text-gray-300 text-[14px]">
                Test Your T20 World Cup Knowledge and Win Coins
                </p>
              </div> */}
              <div className="w-[100%]">
                <SideScoreBoard live={liveMatch.current} />
              </div>
            </div>
          </div>
        </div>
      ) : completedData && upcoming ? (
        <div className="text-white w-[100%] mb-4 h-screen overflow-hidden">
          <div className="min-w-[520px] w-[100%] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border">
            <div
              className="flex flex-col w-full h-screen items-start"
              style={{
                background: `url(${scoreImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "inter",
                backgroundPosition: "center",
              }}
            >
              <div className="flex justify-between w-[100%] pl-[2rem] pr-[4rem] mb-[1rem]">
                <div className="flex flex-col w-1/2 pt-4">
                  <h3 className="text-red-600 font-bold text-[14px] italic">
                    {/* {completedData.matchStatus} */}
                    {completedData.EpsL}
                  </h3>
                  <h1 className="font-bold text-[24px] italic">
                    {/* {completedData.title} */}
                    {`${completedTeam1()} - ${completedTeam2()}`}
                  </h1>
                  <p className="font-light text-gray-300">
                    {/* {completedData.summaryText} */}
                    {completedData.ECo}
                  </p>
                  <p className="font-bold text-[20px]">
                    {/* {completedData.awayScore !== "none"
                        ? completedData.awayScore
                        : ""}{" "}
                      <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                        ({completedData.awayOvers} Overs)
                      </span> */}
                    {`${completedData.Tr1C1} - ${completedData.Tr1CW1}`}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.Tr1CO1} (Overs)
                    </span>
                  </p>
                  <p className="font-bold text-[20px]">
                    {/* {completedData.homeScore}{" "}
                      <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                        ({completedData.homeOvers} Overs)
                      </span> */}
                    {`${completedData.Tr2C1} - ${completedData.Tr2CW1}`}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.Tr2CO1} (Overs)
                    </span>
                  </p>
                </div>

                {/* <p className="underline italic text-center text-[14px]">
                  View Complete ScoreCard
                  </p> */}
                <div className="flex flex-col items-end  pt-4">
                  <h3 className="text-red-600 font-bold text-[14px] italic text-end w-full">
                    UPCOMING MATCHES
                  </h3>
                  {upcoming.map((match, index) =>
                    match.map((match, index) => (
                      <>
                        <div className="flex flex-col justify-between items-start w-full pt-2">
                          <h1>{match?.title}</h1>
                          <div className="flex justify-start gap-4">
                            <p className="font-normal text-gray-300">
                              {/* {getDateAndTime(match.startDateTime)[0]} */}
                              Date -
                            </p>
                            <p className="font-normal text-gray-300">
                              {getDateAndTime(match.startDateTime)}
                            </p>
                          </div>
                        </div>
                      </>
                    ))
                  )}
                </div>
              </div>
              {/* add */}

              {/* <div className="flex flex-col justify-center gap-2">
                <button
                  className="rounded-full px-7 py-2 w-[80%] m-auto text-[1.5rem]"
                  style={{ background: "#111827", border: "1px solid white" }}
                  onClick={handleClick}
                >
                  Play T20 Quiz!
                </button>
                <p className="text-center text-gray-300 text-[14px]">
                  Test Your T20 World Cup Knowledge and Win Coins
                </p>
                </div> */}
              <SideScoreBoard live={liveMatch.current} />
            </div>
          </div>
        </div>
      ) : (
        <SideScoreBoard live={liveMatch.current} />
      )}
    </>
  );
};

export default SideScore;
