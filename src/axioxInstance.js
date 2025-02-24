import axios from "axios";


const Instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});


let userInfoStringify = sessionStorage.getItem("userData");
let userData = userInfoStringify ? JSON.parse(userInfoStringify) : null;

Instance.defaults.headers.common["userid"] = userData ? userData._id : null;
Instance.defaults.withCredentials = true;

export default Instance;
