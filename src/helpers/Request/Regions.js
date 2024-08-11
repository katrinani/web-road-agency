import axios from "axios";
import url from "../url";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
});

const getRegions = async () => {
  try {
    const response = await axios.get(`${url}/regions`);
    if (response.status === 200) {
      const regions = response.data["regions"].map((region) => region["regionName"]);
      console.log(regions);
      return regions;
    }
  } catch (error) {
    handleError(error);
  }
};

const regions = await getRegions();
export default regions;
