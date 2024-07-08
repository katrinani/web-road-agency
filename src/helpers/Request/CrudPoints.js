import axios from "axios";
import { point_types } from "../FormData";
import url from "../url"
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";

class CrudPoints {
  static async createPoint(point) {
    try {

      let body = {
        name: point["Название"],
        type: point_types.indexOf(point["Тип точки"]),
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
      if (response.status === 201) {
        console.log(response);
        NotificationManager.success('Успешно создано');
      }

    } catch (error) {
        handleError(error)
    }
  }
}

export default CrudPoints;
