import axios from "axios";
import url from "../url";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
});

const getAllPoints = async () => {
  try {
    const response = await axios.get(
        `${url}/verifiedPoints`
    );

    if (response.status === 200) {
      const points_list = Array.isArray(response.data.verifiedPoints) ? response.data.verifiedPoints.map((point) => ({
        "Широта": point.coordinates.latitude,
        "Долгота": point.coordinates.longitude,
        "Название": point.name,
        "ID": point.id,
        "Тип точки": [point.type],
        "Описание": point.description,
        "Дорога": point.roadName,
        "Регион": point.regionName
      })) : [];

      return points_list;
    }
  } catch (error) {
      handleError(error);
  }
};


export default getAllPoints;
