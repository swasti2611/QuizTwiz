import React, { useState, useEffect } from "react";

const SideScoreBoard = (props) => {
  const [team1, setTeam1] = useState(true);
  const [team2, setTeam2] = useState(false);
  const [detailScore1, setDetailScore1] = useState(null);
  const [detailScore2, setDetailScore2] = useState(null);
  const [players1, setPlayers1] = useState(null);
  const [players2, setPlayers2] = useState(null);

  let teams = {
    AFG: "AFG",
    AUS: "AUS",
    BAN: "BAN",
    ENG: "ENG",
    IND: "IND",
    IRE: "IRE",
    NAM: "NAM",
    NET: "NED",
    NZE: "NZ",
    PAK: "PAK",
    SCO: "SCO",
    SAF: "SA",
    SLA: "SL",
    UAE: "UAE",
    WES: "WI",
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
  const liveDatatitle1 = () => {
    const res = detailScore1.Ti.split(" ")[0];
    let currentTeam = "";
    for (const key in teams) {
      if (key == res) {
        currentTeam += teams[key];
      }
    }
    return currentTeam;
  };

  const liveDatatitle2 = () => {
    const res = detailScore2.Ti.split(" ")[0];
    let currentTeam = "";
    for (const key in teams) {
      if (key == res) {
        currentTeam += teams[key];
      }
    }
    return currentTeam;
  };

  const handleteam1 = () => {
    setTeam1(true);
    setTeam2(false);
  };
  const handleteam2 = () => {
    setTeam1(false);
    setTeam2(true);
  };

  const getplayer1 = (id) => {
    let playerfound;
    players1.map((player) => {
      if (player.Pid == id) {
        // let player = players1.Ps.filter((man) => man.Pid == id);
        let ply = player;
        
        let name = ply?.Shnm || ply?.Snm;
        playerfound = name;
        return name;
      }
      // else {
      //   let player = players2.map((man) => man.Pid == id);
      //   let name = player?.Shnm || player?.Snm;
      //   console.log("in else condition", name);
      //   return name;
      // }
    });
    
    return playerfound;
  };

  const getplayer2 = (id) => {
    let playerfound;
    players2.map((player) => {
      if (player.Pid == id) {
        let ply = player;
        let name = ply?.Shnm || ply?.Snm;
        playerfound = name;
        return name;
      }
      // else {
      //   let player = players1.map((man) => man.Pid == id);
      //   let name = player?.Shnm || player?.Snm;
      //   return name;
      // }
    });
    return playerfound;
  };

  const getBowler2 = (id) => {
    let playerfound;
    players1.map((player) => {
      if (player.Pid == id) {
        // let player = players1.Ps.filter((man) => man.Pid == id);
        let ply = player;
        let name = ply?.Shnm || ply?.Snm;
        // console.log(player);
        playerfound = name;
        return name;
      }
      // else {
      //   let player = players2.map((man) => man.Pid == id);
      //   let name = player?.Shnm || player?.Snm;
      //   // console.log(player);
      //   return name;
      // }
    });
    return playerfound;
  };

  const getBowler1 = (id) => {
    // if (players2.Tnb !== detailScore1.Tn) {
    //   let player = players2.Ps.filter((man) => man.Pid == id);
    //   let name = player[0]?.Shnm || player[0]?.Snm;
    //   return name;
    // } else {
    //   let player = players1.Ps.filter((man) => man.Pid == id);
    //   let name = player[0]?.Shnm || player[0]?.Snm;
    //   return name;
    // }
    let playerfound;
    players2.map((player) => {
      if (player.Pid == id) {
        let ply = player;
        let name = ply?.Shnm || ply?.Snm;
        playerfound = name;
        return name;
      }
      // else {
      //   let player = players1.map((man) => man.Pid == id);
      //   let name = player?.Shnm || player?.Snm;
      //   return name;
      // }
    });
    return playerfound;
  };

  useEffect(() => {
    const fullScoreBoard = async () => {
      try {
        let scores = await fetch("https://cricket.unibots.in/get_scorecard");
        let data = await scores.json();
        
        setPlayers1(data.data[0].data.Prns);
        setPlayers2(data.data[0].data.Prns);
        setDetailScore1(data.data[0].data.SDInn[0]);
        setDetailScore2(data.data[0].data.SDInn[1]);
      } catch (error) {
        console.log("APi fetch fail", error);
      }
      // console.log(data.data[0].data.SDInn);
      // console.log(data.data[0])
    };
    fullScoreBoard();
    const intervalCall = setInterval(fullScoreBoard, 10000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  
  return (
    <div
      className={` ${
        props.live ? 'w-["100%"] mt-[1rem]' : ""
      } w-[100%]  mx-auto  ${
        props.fullScore ? "w-[100%] px-2 mt-[5rem]" : ""
      } backdrop-blur-md bg-black/10 p-6 rounded-lg`}
    >
      {detailScore1 && detailScore2 && (
        <nav className="text-black w-full flex flex-row justify-around bg-gray-300 rounded-full">
          <div
            className={`rounded-full w-full text-center p-2 text-[20px]  ${
              team1 ? "bg-[#1a2f77]" : ""
            }  ${team1 ? "text-white  font-bold p-2" : ""} cursor-pointer`}
            onClick={handleteam1}
          >
            {liveDatatitle1() || detailScore1.Ti.split(" ")[0]}
          </div>
          <div
            className={`rounded-full w-full text-center p-2 text-[20px]  ${
              team2 ? "bg-[#1a2f77] text-white font-bold p-2" : ""
            } cursor-pointer`}
            onClick={handleteam2}
          >
            {/* {detailScore2.Ti.split(" ")[0]} */}
            {liveDatatitle2() || detailScore2.Ti.split(" ")[0]}
          </div>
        </nav>
      )}
      <div className="w-[100%] mt-[1rem]">
        {team1 && detailScore1 ? (
          <table
            id="score_table"
            className="border-collapse flex md:flex-col flex-row w-[100%]"
          >
            <div className="w-[100%] md:w-[100%]">
              <thead>
                <tr className="table-headers">
                  <th>Batter</th>
                  <th>R</th>
                  <th>B</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>SR</th>
                </tr>
              </thead>
              <tbody>
                {detailScore1.Bat.map((score) => (
                  <tr>
                    <td>{getplayer1(score.Pid)}</td>
                    <td>{score.R}</td>
                    <td>{score.B}</td>
                    <td>{score.$4}</td>
                    <td>{score.$6}</td>
                    <td>{score.Sr}</td>
                  </tr>
                ))}
              </tbody>
            </div>
            <div className="w-[2rem]"></div>
            <div className="w-[100%] md:w-[100%]">
              <thead>
                <tr className="table-headers">
                  <th>Bowler</th>
                  <th>O</th>
                  <th>M</th>
                  <th>R</th>
                  <th>W</th>
                  <th>ECO</th>
                </tr>
              </thead>
              <tbody>
                {detailScore1.Bow.map((score) => (
                  <tr>
                    <td>{getBowler1(score.Pid)}</td>
                    <td>{score.Ov}</td>
                    <td>{score.Md}</td>
                    <td>{score.R}</td>
                    <td>{score.Wk}</td>
                    <td>{score.Er}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </table>
        ) : detailScore2 ? (
          <>
            <table
              id="score_table"
              className="border-collapse flex md:flex-col flex-row"
            >
              <div className="min-w-[50%] md:w-[100%]">
                <thead>
                  <tr className="table-headers">
                    <th>Batter</th>
                    <th>R</th>
                    <th>B</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                  {detailScore2.Bat.map((score) => (
                    <tr>
                      <td>{getplayer2(score.Pid)}</td>
                      <td>{score.R}</td>
                      <td>{score.B}</td>
                      <td>{score.$4}</td>
                      <td>{score.$6}</td>
                      <td>{score.Sr}</td>
                    </tr>
                  ))}
                </tbody>
              </div>
              <div className="w-[2rem]"></div>
              <div className="w-[50%] md:w-[100%]">
                <thead>
                  <tr className="table-headers">
                    <th>Bowler</th>
                    <th>O</th>
                    <th>M</th>
                    <th>R</th>
                    <th>W</th>
                    <th>ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {detailScore2.Bow.map((score) => (
                    <tr>
                      <td>{getBowler2(score.Pid)}</td>
                      <td>{score.Ov}</td>
                      <td>{score.Md}</td>
                      <td>{score.R}</td>
                      <td>{score.Wk}</td>
                      <td>{score.Er}</td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </table>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SideScoreBoard;
