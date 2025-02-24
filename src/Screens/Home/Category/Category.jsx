import React, { useEffect, useState } from "react";

const Search = "https://playerstorage.b-cdn.net/quiztwiz/assets/Search.svg";
// import AllCate from "https://playerstorage.b-cdn.net/quiztwiz/assets/all_cate.png";
// import Animals from "https://playerstorage.b-cdn.net/quiztwiz/assets/animals.png";
// import Maths from "https://playerstorage.b-cdn.net/quiztwiz/assets/maths.png";
// import Sport from "https://playerstorage.b-cdn.net/quiztwiz/assets/sport.png";
// import Brain from "https://playerstorage.b-cdn.net/quiztwiz/assets/brain.png";
// import History from "https://playerstorage.b-cdn.net/quiztwiz/assets/history.png";
// import Bollywood from "https://playerstorage.b-cdn.net/quiztwiz/assets/bollywood.png";
// import Knowledge from "https://playerstorage.b-cdn.net/quiztwiz/assets/knowledge.png";
// import Cricket from "https://playerstorage.b-cdn.net/quiztwiz/assets/cricket.png";
// import Ipl from "https://playerstorage.b-cdn.net/quiztwiz/assets/ipl.png";
// import India from "https://playerstorage.b-cdn.net/quiztwiz/assets/india.png";
// import Geography from "https://playerstorage.b-cdn.net/quiztwiz/assets/geography.png";
// import Hindi from "https://playerstorage.b-cdn.net/quiztwiz/assets/hindi.png";
// import Science from "https://playerstorage.b-cdn.net/quiztwiz/assets/science.png";
// import Literature from "https://playerstorage.b-cdn.net/quiztwiz/assets/literature.png";
// import Blanks from "https://playerstorage.b-cdn.net/quiztwiz/assets/blanks.png";
// import English from "https://playerstorage.b-cdn.net/quiztwiz/assets/english.png";
// import Food from "https://playerstorage.b-cdn.net/quiztwiz/assets/food.png";
// import Tech from "https://playerstorage.b-cdn.net/quiztwiz/assets/tech.png";
// import Business from "https://playerstorage.b-cdn.net/quiztwiz/assets/business.png";
// import Ssc from "https://playerstorage.b-cdn.net/quiztwiz/assets/ssc.png";
// import Kbc from "https://playerstorage.b-cdn.net/quiztwiz/assets/kbc.png";
// import Automobiles from "https://playerstorage.b-cdn.net/quiztwiz/assets/automobile.png";
// import Hollywood from "https://playerstorage.b-cdn.net/quiztwiz/assets/hollywood.png";
import { getCategories } from "../../../API/Question";
import { useHistory } from "react-router-dom";
import GoogleAds from "../../../GoogleAds";

const Category = (props) => {
  const [search, setSearch] = useState("");
  const [cateData, setCateData] = useState([]);
  const [searchText, setSearchText] = useState(false);
  const history = useHistory();
  const enteringData = (event) => {
    setSearch(event.target.value);
    setSearchText(true);
    if (event.target.value === "") {
      setSearchText(false);
    }
  };

  const goToGame = (id) => {
    props.changeCategoryId(id);
    history.push(`/home/quizzes-for-category`);
  };

  useEffect(() => {
    let dataCategory = async () => {
      let categatoryData = await getCategories();
      setCateData(categatoryData?.data?.data);
    };
    dataCategory();
  }, []);

  const clearSearch = () => {
    setSearch("");
    setSearchText(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center pt-[2rem]">
          <div>
            <GoogleAds />
          </div>
        </div>
        <div className="text-lg font-bold text-center">
          {" "}
          Select the Quiz category that you want to play{" "}
        </div>
        <div className="border-2 border-white rounded-full px-4 py-3 flex gap-2">
          <img src={Search} alt="search" />
          <input
            className="bg-transparent text-lg outline-none w-full"
            type="text"
            placeholder="Search Quiz Category"
            value={search}
            onChange={enteringData}
          />
          {searchText ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              onClick={clearSearch}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {cateData
            .filter((e) => {
              if (search == "") {
                return e;
              } else if (
                e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return e;
              }
            })
            .map((data) => {
              return (
                <div key={data._id}>
                  <div
                    onClick={() => goToGame(data._id)}
                    className="flex gap-1 items-center border-[1px] border-white rounded-full p-2 cursor-pointer"
                  >
                    <img
                      className="w-[46px] rounded-full"
                      src={data?.img || data?.image}
                      alt="category"
                    />
                    <span className="w-full text-center text-sm">
                      {" "}
                      {data.name}{" "}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Category;
