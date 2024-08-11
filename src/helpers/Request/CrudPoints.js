import axios from "axios";
import { verifiedTypes } from "../FormData";
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
        type: verifiedTypes.indexOf(point["Тип точки"]),
        coordinates: {
          latitude: point["Широта"],
          longitude: point["Долгота"],
        },
        roadName: point["Дорога"] || null,
        regionName: point["Регион"]["value"] || null,
        description: point["Описание"] || null
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

    } catch (error) {
        handleError(error)
    }
  }

  static async pointEditing (point) {
    console.log(point)
    try {
      let body = {
        name: point.Название,
        type: point.Тип,
        coordinates: {
          latitude: point.Широта,
          longitude: point.Долгота,
        },
        description: point.Описание || null,
        regionName: point.Регион || null,
        newRoadName: point.Дорога || null,
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
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }

  static async pointDeleting (point) {
    console.log(point)
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
