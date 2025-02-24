import axios from "../axioxInstance";

const getClientData = async (subdomain) => {
  try {
    const result = await axios({
      url: "/getClientData",
      method: "POST",
      data: { client: subdomain },
    });
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default getClientData;
