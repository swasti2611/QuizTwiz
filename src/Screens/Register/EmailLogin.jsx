import React, { useState, useEffect } from "react";
import SidePoster from "../SidePoster/SidePoster";
import { loginuser } from "../../API/Auth";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../GlobalStorage/actions/userActions";
import { toast, ToastContainer } from "react-toastify";
import GoogleAds from "../../GoogleAds";
function EmailLogin() {
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let subdomain = window.location.href.split("//")[1].split(".")[0];
  const history = useHistory();
  useEffect(() => {
    const token = cookies.token;
    if (token) {
      history.push("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        let res = await loginuser(email, password, subdomain);
        // console.log("login user", res);
        if (res.error === null) {
          setCookie("token", res.data.token);
          // alert("login successful");

          history.push("/");

          dispatch(loginUser(res.data));
        } else if (res.error.msg === "User Not Found") {
          toast.error("User Not Found, Signup to play", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            history.push("/signup");
          }, [3000]);
        } else {
          toast.error("Wrong Email or Password", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <ToastContainer
        toastClassName="my-toast-container-colored"
        bodyClassName="my-toast-body-colored"
        theme="dark"
      />
      <div className="text-white h-screen flex overflow-hidden">
        <div className="min-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full max-h-screen flex flex-col gap-3 pb-3 items-center overflow-y-auto scrollhide box-border">
          <div className="flex flex-col justify-start items-center  h-screen w-[100%]">
            <div className="max-w-[450px] max-h-[320px] mobile-width mt-2 mb-4">
              <GoogleAds adSlot="email_login" />
            </div>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80%]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
        <SidePoster />
      </div>
    </>
  );
}

export default EmailLogin;
