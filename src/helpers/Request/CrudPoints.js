import axios from "axios";
import url from "../url"
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
});

class CrudPoints {
  static async createPoint(point) {
    try {
      let body = {
        name: point["Название"],
        type: point["Тип точки"][0],
        coordinates: {
          latitude: point["Широта"],
          longitude: point["Долгота"],
        },
        roadName: point["Дорога"] === "" ? null : point["Дорога"],
        regionName: point["Регион"] === "" ? null : point["Регион"],
        description: point["Описание"] === "" ? null : point["Регион"]
      };
      console.log(body)
      let mainURL = url + `/verifiedPoints`
      const response = await axios.post(
          mainURL,
          body
      );
      console.log(response);
      if (response.status === 201) {
        NotificationManager.success('Успешно создано');
      }
      return response.status;
    } catch (error) {
        handleError(error)
    }
  }

  static async pointEditing (point) {
    console.log(point)
    try {
      let body = {
        name: point["Название"],
        type: point["Тип точки"][0],
        coordinates: {
          latitude: point["Широта"],
          longitude: point["Долгота"],
        },
        roadName: point["Дорога"] === "" ? null : point["Дорога"],
        regionName: point["Регион"] === "" ? null : point["Регион"],
        description: point["Описание"] === "" ? null : point["Регион"]
      };
      console.log('Body: ', body)
      let mainUrl = `/verifiedPoints/${point.ID}`
      console.log(mainUrl)

      const response = await axios.put(
          url + mainUrl,
          body
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        NotificationManager.success('Успешно изменена');
      }
      return response.status;
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }

  static async pointDeleting (point) {
    try {
      let mainUrl = `/verifiedPoints/${point.ID}`
      console.log(mainUrl)

      const response = await axios.delete(
          url + mainUrl
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        NotificationManager.success('Успешно удалено');
      }
      return response.status;
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }
}

export default CrudPoints;
