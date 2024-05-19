import axios from "axios";
import { point_types } from "../FormData";
import url from "../url"
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";


class CrudPoints {
  static async createPoint(point) {
    try {
      let body = {
        point: {
          name: point["Название"],
          type: point_types.indexOf(point["Тип точки"]),
          coordinates: {
            latitude: point["Широта"],
            longitude: point["Долгота"],
          },
        },
      };

      const response = await axios.post(
          url + `/api/roads/${point["Дорога"]}/verifiedPoints`,
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
