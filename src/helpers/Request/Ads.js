import axios from "axios";
import url from "../url";
import handleError from "../Notifications";
import { NotificationManager } from "react-notifications";

const prepareAdvert = (newMessage) => {
  const { locationType, location, title, description, expireTime } = newMessage;
  const expirationTime = expireTime.toISOString();
  console.log(expirationTime);
  const advertisement = {
    title,
    description: description || undefined,
  };
  if (locationType === "Дорога") {
    advertisement.roadName = location;
  } else if (locationType === "Регион") {
    advertisement.regionName = location;
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
