import axios from "axios";
import url from "../url";
import handleError from "../Notifications";
import { NotificationManager } from "react-notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
});

const prepareAdvert = (newMessage) => {
  const { locationType, location, title, description, expireTime } = newMessage;
  const expirationTime = expireTime.toISOString();
  console.log(expirationTime);
  const advertisement = {
    title,
    description: description || "",
  };
  if (locationType === "Дорога") {
    advertisement.roadName = location;
    advertisement.regionName = null;
  } else if (locationType === "Регион") {
    advertisement.regionName = location;
    advertisement.roadName = null;
  }
  advertisement.expirationTime = expirationTime;
  console.log(advertisement);
  return { advertisement };
};

const sendAdvert = async (newMessage) => {
  try {
    const advert = prepareAdvert(newMessage);
    const response = await axios.post(`${url}/advertisements`, advert);
    console.log(response);
    if (response.status === 201) {
      console.log("Объявление успешно отправлено");
      NotificationManager.success("Успешно создано");
    }
  } catch (error) {
    handleError(error);
  }
};

export default sendAdvert;
