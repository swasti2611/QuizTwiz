import React, { useEffect, useState } from "react";
import SidePoster from "../SidePoster/SidePoster";
import { addEmailUser } from "../../API/Auth";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import GoogleAds from "../../GoogleAds";
import { useCookies } from "react-cookie";
function EmailSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies] = useCookies(["token"]);
  const history = useHistory();
  useEffect(() => {
    const token = cookies.token;
    if (token) {
      history.push("/");
    }
  }, []);
  let subdomain = window.location.href.split("//")[1].split(".")[0];
  const handleSubmit = async (e) => {
    // console.log("login site signup", subdomain);
    e.preventDefault();
    if (email && password) {
      let res = await addEmailUser(email, password, 100, subdomain);
      // console.log("email res", res);
      if (res?.error?.msg) {
        if (res?.error?.msg === "User already exists") {
          toast.error("You are already signed up, Try Logging up", {
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
          toast.error("User Not Registered, Server Error", {
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
      } else {
        toast.success("Sign Up Successful. Login to Play quiz", {
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
      setTimeout(() => {
        history.push("/login");
      }, [3000]);
      //   let response = await res.json();
      //   console.log("response", response);
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
          <div className="flex flex-col justify-start items-center h-screen w-[100%]">
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
                  Sign In
                </button>
                <p className="text-gray-700 text-sm">
                  Already registered?{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <SidePoster />
      </div>
    </>
  );
}

export default EmailSignup;
