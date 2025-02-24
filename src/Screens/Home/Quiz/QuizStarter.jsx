import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const Coin = "https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg";

const Play = "https://playerstorage.b-cdn.net/quiztwiz/assets/play.svg";
import { toast, ToastContainer } from "react-toastify";
const completed = "https://playerstorage.b-cdn.net/quiztwiz/assets/completed.png";
import { cutFee, getQuizzes } from "../../../API/Question";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../../../GlobalStorage/actions/refresh";

const QuizStarter = (props) => {
  const history = useHistory();
  const param = useParams();
  let dispatch = useDispatch();
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  const [found, setFound] = useState(true);
  const [show, setShow] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  let userDB = useSelector((state) => state.userData);
  //let id = param.id

  const startQuiz = async (index) => {
    let res = await cutFee(userData?._id, currentData?.entryFee);
    if (res.error) {
      // sessionStorage.clear()
      // history.push("/")
      toast.warn("Unauthorized", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // console.log(res);
      dispatch(refreshUser());
      history.push({
        pathname: "/home/quiz",
        state: { quizID: currentData[index]?._id },
      });
    }
  };
  // console.log(props)

  useEffect(() => {
    if (userDB) {
      let alreadyPlayed = userDB?.quizPlayed;
      const getQuizzData = async () => {
        let res = await getQuizzes(props.categoryId);
        if (res.error) {
          toast.error(res.error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setFound(false);
        } else {
          let checker = res.data.data.map((item) => item._id);
          let showQuiz = checker.filter((val) => !alreadyPlayed.includes(val));
          const displayQuiz = res.data.data.filter(
            (item) => item._id === showQuiz[0]
          );
          // console.log(displayQuiz)
          // console.log(showQuiz)
          // console.log(checker)
          setCurrentData(displayQuiz);
          setFound(false);
        }
      };
      getQuizzData();
    } else {
      const getQuizzData = async () => {
        let res = await getQuizzes(props.categoryId);
        if (res.error) {
          toast.error(res.error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setCurrentData(res?.data?.data);
          setFound(false);
        }
      };
      getQuizzData();
    }
  }, []);

  // console.log(currentData)
  const goToGame = (id) => {
    // props.changeCategoryId(id);
    // console.log(id)
    history.push(`/home/quizzes-play/${id}`);
  };
  const handleHome = () => {
    props.func("home");
    // console.log(props.activeTab)
    history.push(`/home`);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {currentData?.length ? (
        <>
          {currentData?.map((data, index) => (
            <div
              className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer"
              onClick={() => goToGame(data.title)}
              key={index}
            >
              <div className="flex gap-2 items-center px-2 justify-between">
                <div className="flex flex-col">
                  <img
                    className="object-cover w-20 rounded-full"
                    src={data?.image || data?.img}
                    alt="CategoryImage"
                  />
                </div>
                <div className="flex flex-col w-full justify-start">
                  <div className="flex text-[10px] text-text_hd font-black sm:text-[8px] flex-col items-end px-5 ">
                    <div className="bg-bg px-1"> {data.title} </div>
                  </div>
                  <div className="flex items-end flex-col px-5">
                    <div className="text-[12px] sm:text-[10px] font-black flex">
                      Play & Win&nbsp;&nbsp;
                      <img
                        className="w-[20px] object-contain"
                        src={Coin}
                        alt="Play"
                      />
                      &nbsp;
                      {data.totalPrice}
                    </div>
                  </div>
                  <div className="flex px-5 items-end flex-col">
                    <span className="text-[10px] flex gap-1 sm:text-[8px]">
                      Entry Fee &nbsp;
                      <img
                        className="w-[14px] object-contain"
                        src={Coin}
                        alt="Fee"
                      />
                      &nbsp;
                      {data.entryFee}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <img
                    src={Play}
                    alt="Play"
                    className="rounded-full object-cover w-20"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {found ? (
            <h1>Loading Please wait....</h1>
          ) : (
            <div className="flex w-full h-[500px] flex-col justify-center items-center rounded-xl">
              <div className="flex justify-center">
                <img src={completed} alt="completed" className="ml-6" />
              </div>
              <div className="mt-6 text-center">
                <h1>You have played All quizzes in this category</h1>
                <p>Comeback for more tomorrow!!</p>
              </div>
              <button
                onClick={handleHome}
                className="rounded-full px-7 py-2 mt-8"
                style={{ background: "#1a2f77" }}
              >
                Home
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default QuizStarter;
