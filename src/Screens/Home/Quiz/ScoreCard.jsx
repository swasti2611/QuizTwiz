import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
const scoreImg = "https://playerstorage.b-cdn.net/quiztwiz/assets/background_score.jpg";
const loadinggif = "https://playerstorage.b-cdn.net/quiztwiz/assets/loadingani.gif";
import GoogleAds from "../../../GoogleAds";
// import { ClientID } from "../../../GlobalStorage/actions/client";
import { useSelector } from "react-redux";
const ScoreCard = () => {
  // let { cat } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const history = useHistory();
  let clientid = useSelector((state) => state.clientId);
  let teams = [];
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
  };

  const completedTeam1 = () => {
    // let res = completedData.T1[0].Abr;
    let res = completedData.homeTeam;
    let currentTeam = "";
    for (const key in teamsPlaying) {
      if (key == res) {
        currentTeam += teamsPlaying[key];
      }
    }
    return res;
  };

  const completedTeam2 = () => {
    // let res = completedData.T2[0].Abr;
    let res = completedData.awayTeam;
    let currentTeam = "";
    for (const key in teamsPlaying) {
      if (key == res) {
        currentTeam += teamsPlaying[key];
      }
    }
    return res;
  };

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

  for (const p of searchParams) {
    teams.push(p[1]);
  }
  const isMobile = () => {
    let check = false;
    ((a) => {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  let onMobile = isMobile();
  console.log(onMobile);
  if (!onMobile) {
    history.push(`/starter/t20?team1=${teams[0]}&team2=${teams[1]}`);
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState(null);
  const [completedData, setcompletedData] = useState(null);
  const [upcoming, setUpComing] = useState([]);

  const getDateAndTime = (date) => {
    let newDate = date?.split(",")[0].split("-").reverse();
    let newTime = date?.split(",")[1];

    let resDate = newDate?.join("-") + "T" + newTime + "Z";
    let finalDate = new Date(`${resDate}`).toUTCString().split(" ");
    let splitTime = finalDate[4];
    const splitDate = finalDate.slice(1, 4).join(" ");

    let dateandtime = [splitDate, splitTime];
    return dateandtime;
  };

  const handleClick = () => {
    history.push(`/starter/t20?team1=${teams[0]}&team2=${teams[1]}`);
  };

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

  useEffect(() => {
    const schedule = async () => {
      const upcoming = await fetch("https://cricket.unibots.in/get_schedule");
      let res = await upcoming.json();
      // console.log(res);
      let arr = [];
      res.data.map((item) => {
        if (item.status === "Not started") {
          if (arr.length < 2) {
            arr.push(item);
          }
        }
      });
      // console.log(arr);
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
    // console.log(data);
    if (data) {
      data.map((match, i) => {
        // console.log(match);
        if (match[0]?.matchStatus === "LIVE") {
          setLiveData(match[0]);
        }
        // else if (match[0]?.matchStatus === "COMPLETED") {
        //   // console.log("completed");
        //   // console.log(match[0]);
        //   setcompletedData(match[0]);
        // }
      });
    }
  }, [data]);

  // console.log(completedData);
  // console.log(liveData);
  // console.log(upcoming);
  return (
    <>
      {!completedData && !liveData && (
        <>
          <h1 className="text-white">Match Data Unavaliable</h1>
          <div className="flex flex-col justify-center gap-2">
            <button
              className="rounded-full text-white px-7 py-2 w-[80%] m-auto text-[1.5rem]"
              style={{ background: "#111827", border: "1px solid white" }}
              onClick={handleClick}
            >
              Play T20 Quiz!
            </button>
            <p className="text-center text-gray-300 text-[14px]">
              Test Your T20 World Cup Knowledge and Win Coins
            </p>
          </div>
        </>
      )}
      {loading && (
        <div className="flex flex-col justify-center align-center h-screen">
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
        <div className="text-white w-screen h-screen flex overflow-hidden">
          <div className="min-w-[520px] max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border">
            <NavBar />
            <div
              className="px-5 pt-[4rem] pb-20 flex flex-col w-full gap-2 h-screen"
              style={{
                background: `url(${scoreImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "inter",
                backgroundPosition: "center",
              }}
            >
              <div>
                <h3 className="text-red-600 font-bold text-[14px] italic">
                  Live Score
                </h3>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[24px] italic">
                    {liveDatatitle()}
                  </h1>
                  <button
                    className="rounded-full px-4 text-[14px] py-1 bg-blue border-2"
                    onClick={() => history.push("/ScoreCard")}
                  >
                    Full scorecard
                  </button>
                </div>
                <p className="font-light text-gray-300">
                  {liveData.summaryText}
                </p>
                <p className="font-light text-gray-300">
                  {liveData.awayScore !== "none" ? liveData.awayScore : ""}
                </p>
                <p className="font-bold text-[20px]">
                  {currentTeam()} {liveData.currentScore}{" "}
                  <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                    ({liveData.currentOvers} over)
                  </span>
                </p>
              </div>
              <div className="m-0">
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
                {/* bowler */}
                <table style={{ width: "100%", textAlign: "left" }}>
                  <thead>
                    <tr className="table-headers">
                      <th>Bowler</th>
                      <th>O</th>
                      <th>M</th>
                      <th>R</th>
                      <th>W</th>
                      {/* <th>ECO</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{liveData.currentBowler}</td>
                      <td>{liveData.currentBowlerOvers}</td>
                      <td>{liveData.currentBowlerMaidens}</td>
                      <td>{liveData.currentBowlerRuns}</td>
                      <td>{liveData.currentBowlerWickets}</td>
                      {/* <td>5</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-[350px]">
                <GoogleAds clientId={clientid} />
              </div>
              <div className="flex flex-col justify-center gap-2">
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
              </div>
            </div>
          </div>
          {/* <SidePoster /> */}
        </div>
      ) : (
        completedData &&
        upcoming && (
          <div className="text-white h-screen flex overflow-hidden">
            <div className="min-w-[520px] max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border">
              <NavBar />
              <div
                className="px-5 pt-[4rem] pb-20 flex flex-col w-full gap-2 h-screen"
                style={{
                  background: `url(${scoreImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  fontFamily: "inter",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex flex-col">
                  <h3 className="text-red-600 font-bold text-[14px] italic">
                    {/* {completedData.matchStatus} */}
                    {completedData.EpsL}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-[24px] italic">
                      {/* {completedData.title}
                       */}
                      {`${completedTeam1()} - ${completedTeam2()}`}
                    </h1>
                    <button
                      className="rounded-full px-4 text-[14px] py-1 bg-blue border-2"
                      onClick={() => history.push("/ScoreCard")}
                    >
                      Full scorecard
                    </button>
                  </div>
                  <p className="font-light text-gray-300">
                    {/* {completedData.summaryText} */}
                    {completedData.ECo}
                  </p>
                  <p className="font-bold text-[20px]">
                    {/* {completedData.awayScore !== "none"
                      ? completedData.awayScore
                      : ""}{" "}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.awayOvers}
                    </span> */}
                    {`${completedData.Tr1C1} - ${completedData.Tr1CW1}`}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.Tr1CO1}(overs)
                    </span>
                  </p>
                  <p className="font-bold text-[20px]">
                    {/* {completedData.homeScore}{" "}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.homeOvers}
                    </span> */}
                    {`${completedData.Tr2C1} - ${completedData.Tr2CW1}`}
                    <span className="text-[12px] font-normal inline-block px-2 text-gray-300">
                      {completedData.Tr2CO1}(overs)
                    </span>
                  </p>
                </div>
                <div className="m-0">{/* batsman */}</div>
                {/* <p className="underline italic text-center text-[14px]">
                View Complete ScoreCard
              </p> */}
                <h3 className="text-red-600 font-bold text-[14px] italic">
                  UPCOMING MATCHES
                </h3>
                <div className="flex flex-col">
                  {upcoming.map((match, index) => (
                    <>
                      <div className="flex justify-between">
                        <h1 className="font-normal w-[33%] text-[12px]">
                          {match?.title}
                        </h1>
                        <p className="font-normal w-[33%] text-gray-300">
                          {getDateAndTime(match.match_startDateTime)[0]}
                        </p>
                        <p className="font-normal w-[33%] text-gray-300">
                          {getDateAndTime(match.match_startDateTime)[1]}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="w-[350px]">
                  <GoogleAds clientId={clientid} />
                </div>
                {/* add */}

                <div className="flex flex-col justify-center gap-2">
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
                </div>
              </div>
            </div>
            {/* <SidePoster /> */}
          </div>
        )
      )}
    </>
  );
};

export default ScoreCard;
