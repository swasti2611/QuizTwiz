import axios from "../axioxInstance";
import sendErrorToDiscord from "./Error";
const getUser = async (headers) => {
  let userInfoStringify = sessionStorage.getItem("userData");
  let userData = userInfoStringify ? JSON.parse(userInfoStringify) : null;

  // console.log("headers and userData", headers, userData);
  let resolved = {
    data: null,
    error: userData ? null : "401 Unauthorized",
  };

  try {
    const res = await axios({
      url: `auth/`,
      method: "GET",
      headers,
      withCredentials: true,
    });
    resolved.data = res.data;
    // console.log("response", res);
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
    await sendErrorToDiscord(err, `getUser - Quiz`);
  }

  return resolved;
};

const addUser = async (
  phone = null,
  email = null,
  fn = null,
  ln = null,
  image = null,
  loginSite
) => {
  let resolved = {
    data: null,
    error: null,
  };

  let localCoins =
    sessionStorage.getItem("localCoins") != null
      ? sessionStorage.getItem("localCoins")
      : 0;
  sessionStorage.removeItem("localCoins");

  try {
    const res = await axios({
      url: `auth/add_user`,
      method: "POST",
      headers: {
        // "userid": userData ? userData._id : null
      },
      data: {
        phone,
        email,
        fn,
        ln,
        image,
        localCoins,
        loginSite,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
    await sendErrorToDiscord(err, `addUser - Quiz: `);
  }

  return resolved;
};

const updateUserCoins = async (email, newCoins) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `auth/updateUser`,
      method: "POST",

      data: {
        email,
        newCoins,
      },
      withCredentials: true,
    });
    resolved.data = await res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const addEmailUser = async (email, password, coins, loginSite) => {
  // console.log("logins site", loginSite);
  let resolved = {
    data: null,
    error: null,
  };

  try {
    const res = await axios({
      url: `auth/signup`,
      method: "POST",
      headers: {
        // "userid": userData ? userData._id : null
      },
      data: {
        email,
        password,
        coins,
        loginSite,
      },
      withCredentials: true,
    });
    resolved.data = await res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const loginuser = async (email, password, subdomain) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `auth/login`,
      method: "POST",
      data: {
        email,
        password,
        subdomain,
      },
      withCredentials: true,
    });
    resolved.data = await res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
    await sendErrorToDiscord(err, `Login Fail - Quiz`);
  }
  return resolved;
};

const updateUser = async (
  phone = null,
  email = null,
  coins,
  quizPlayed = [],
  siteLogin = []
) => {
  let resolved = {
    data: null,
    error: null,
  };

  try {
    const res = await axios({
      url: `auth/update_user`,
      method: "PUT",
      headers: {
        // "userid": userData ? userData._id : null
      },
      data: {
        phone,
        email,
        coins,
        quizPlayed,
        siteLogin,
      },
      withCredentials: true,
    });
    resolved.data = await res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const logoutUser = async () => {
  await axios({
    url: `auth/logout`,
    method: "GET",
  });
};

export {
  getUser,
  addUser,
  updateUser,
  logoutUser,
  addEmailUser,
  loginuser,
  updateUserCoins,
};
