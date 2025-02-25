import React, {useEffect, useState} from 'react'


function FootballPoster() {
const[matchData, setMatchData] = useState({});
const [teams, setTeams] = useState([]);
const [startDate, setStartDate] = useState("");
const [today, setToday] = useState("")

  useEffect(() => {

    const getDetails = async () => {
        const res = await fetch("https://cricket.unibots.in/get_score_fifa");
        let match = await res.json();
        setMatchData(match.data[0][0]);
        setTeams(match.data[0][0].title.split(" "));
        setStartDate(match.data[0][0].startDateTime.substring(11))
        let d = new Date();
        setToday(d.getHours()+':'+d.getMinutes());
    } 
    getDetails();
    const intervalCall = setInterval(getDetails, 60000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, [matchData.matchdetails] );

  return (
        <div className='w-full h-full p-8 m-12 bg-footballGround bg-center bg-cover rounded-3xl'> 
          <div className='w-1/2 m-auto flex p-1 text-center space-x-20 bg-gray-400 bg-opacity-20 justify-center border border-transparent rounded-lg'>
            <div className='w-28 text-sm my-auto'>
              <h3 className='mt-2 '>{teams[0]}</h3>
            </div>

            <div className='my-auto w-20'>
              <h3 className='text-2xl font-bold md-1'>{matchData.matchScore ? matchData.matchScore[0] + ` - ` + matchData.matchScore[2] : null}</h3>           
              <p className='text-xs mt-3 text-slate-300'>{matchData.match_FTscore ? "Full Time" : (Number(today.substring(0,2)) - Number(startDate.substring(0,2))) < 0 ? (24 + Number(today.substring(0,2)) - Number(startDate.substring(0,2)))*60 + (Number(today.substring(3,5)) - Number(startDate.substring(3,5)))+`'` : (Number(today.substring(0,2)) - Number(startDate.substring(0,2)))*60 + (Number(today.substring(3,5)) - Number(startDate.substring(3,5)))+`'`}</p> 
            </div>

            <div className='w-28 text-sm my-auto'>
              <h3 className='mt-2'>{teams[2]}</h3>
            </div>
          </div>
          
          <div className='w-3/4 m-auto text-xs mt-8 p-1 bg-zinc-700 bg-opacity-30 border border-transparent rounded-md'>
            {matchData.matchdetails?.map(item => {
              return(
              <div className='flex justify-start h-16 border border-transparent border-zinc-700 rounded-md grid-cols-4'>
                <div className='w-4 mx-4 my-auto '>{item.minutes + `'`}</div>
                <div className='w-28 flex ml-28 my-auto text-sm font-bold'>{item.goal} 
                  {item.goal && <div className='mx-2 my-auto'>
                  <svg width="16" height="16" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 24.8571C48 37.6386 37.6386 48 24.8571 48C12.0757 48 1.71429 37.6386 1.71429 24.8571C1.71429 12.0757 12.0757 1.71429 24.8571 1.71429C37.6386 1.71429 48 12.0757 48 24.8571Z" fill="white"/>
                  <path d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25ZM23.7696 3.60714C23.7912 3.90745 23.7265 4.20767 23.5832 4.47246C23.4399 4.73725 23.2239 4.95559 22.9607 5.10179L16.2768 8.81429C16.1403 8.89016 15.9944 8.9478 15.8429 8.98571L15.1518 9.15893L15.5375 11.8571L21.7786 13.1071C22.1271 13.1755 22.4469 13.3472 22.6964 13.6L30.3571 9.76786V6.45893C30.3571 6.03327 30.5091 5.6216 30.7858 5.29812C31.0624 4.97464 31.4456 4.76062 31.8661 4.69464C29.2622 3.81514 26.5134 3.44531 23.7696 3.60536V3.60714ZM10.3232 9.3875C6.84441 12.6507 4.55647 16.9834 3.82321 21.6964L9.47857 18.8696C9.52006 18.7724 9.57026 18.6792 9.62857 18.5911L13.625 12.6018C13.8638 12.2434 14.224 11.9834 14.6393 11.8696L14.2821 9.37679L12.0857 9.925C11.7712 10.0058 11.4405 9.99833 11.1299 9.90352C10.8193 9.8087 10.5408 9.63017 10.325 9.3875H10.3232ZM3.6875 22.7625C3.61071 23.4946 3.57143 24.2393 3.57143 24.9911V25.0089C3.57143 27.4446 3.98036 29.7875 4.73036 31.9696L9.56964 37.3482C9.72841 37.1571 9.92551 37.0013 10.1482 36.8911L13.3589 35.2839C13.5254 35.2014 13.7037 35.1454 13.8875 35.1179L14.6161 26.3839C14.1566 26.3118 13.7433 26.0632 13.4643 25.6911L9.6875 20.6536C9.5255 20.4384 9.41439 20.1893 9.3625 19.925L3.6875 22.7643V22.7625ZM9.19643 38.2679L5.76429 34.4536C6.78756 36.5316 8.14014 38.4305 9.76964 40.0768C9.57204 39.6707 9.40317 39.2512 9.26429 38.8214C9.20676 38.6429 9.18373 38.455 9.19643 38.2679ZM25 46.4286C29.5821 46.4286 33.8286 44.9893 37.3125 42.5393L37.7518 39.0339C37.5464 39.0609 37.338 39.0518 37.1357 39.0071L31.7554 37.8107C31.3827 37.728 31.0465 37.5276 30.7964 37.2393L22.1714 41.2214C22.1689 41.2453 22.1659 41.2691 22.1625 41.2929L21.6964 44.5607C21.6589 44.8179 21.5679 45.0607 21.4357 45.275C22.2196 45.7143 23.0411 46.0857 23.8643 46.4C24.2393 46.4179 24.6179 46.4286 25 46.4286ZM38.7054 38.6036L38.3054 41.8C42.1272 38.7746 44.8035 34.5368 45.8929 29.7857L43.2804 31.0911C43.244 31.1845 43.1998 31.2747 43.1482 31.3607L39.0554 38.1821C38.9611 38.3398 38.843 38.4819 38.7054 38.6036ZM43.3589 30.0536L46.1143 28.6768C46.3214 27.4804 46.4286 26.2536 46.4286 25C46.4286 20.3089 44.9214 15.9696 42.3643 12.4411C42.3194 12.8438 42.1386 13.2192 41.8518 13.5054L40.2714 15.0857C40.0973 15.2598 39.8891 15.3959 39.6599 15.4857C39.4306 15.5754 39.1853 15.6168 38.9393 15.6071L39.6304 24.7946C39.8135 24.9157 39.9727 25.0694 40.1 25.2482L43.0696 29.4054C43.2125 29.6018 43.3089 29.825 43.3589 30.0536ZM15.5196 26.2929L14.7768 35.2071C14.9076 35.2555 15.0322 35.3191 15.1482 35.3964L21.3857 39.5536C21.6639 39.7396 21.8842 40.0001 22.0214 40.3054L30.3964 36.4411C30.3702 36.3178 30.357 36.1921 30.3571 36.0661V28.8875C30.3568 28.6299 30.4123 28.3752 30.5196 28.1411L22.4768 23.45C22.3576 23.5371 22.228 23.6091 22.0911 23.6643L15.5554 26.2768L15.5196 26.2929ZM23.0518 22.7518L31.0929 27.4429C31.2126 27.3556 31.3428 27.2836 31.4804 27.2286L37.9839 24.6286C38.2158 24.5355 38.4646 24.4923 38.7143 24.5018L38.0232 15.3143L31.2232 11.2339C30.9768 11.086 30.7698 10.8808 30.6196 10.6357L23.1482 14.3714C23.1911 14.5268 23.2143 14.6893 23.2143 14.8571V22.0054C23.2146 22.263 23.1592 22.5176 23.0518 22.7518Z" fill="#424242"/>
                  </svg>
                  </div>}
                </div>
                <div className='w-8 mx-6 my-auto text-base font-bold'>{item.score ? item.score[0] + ` - ` + item.score[1] : null}</div>
                <div className='flex my-auto text-sm font-bold'>
                  {item.yellowcard && <div className='mx-3 my-auto'>
                    <svg width="16" height="20" viewBox="0 0 33 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.286133" width="32.2857" height="50" rx="5" fill="#EBEF13"/>
                    </svg>
                  </div>}
                  {item.yellowcard}
                </div>
              </div>
            );
          })}
          </div>
        </div>
  );
}

export default FootballPoster;
