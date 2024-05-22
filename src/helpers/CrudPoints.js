import axios from "axios";
import { point_types } from "./FormData";
import url from "./url";

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
        roadName: point["Дорога"]
      };

      const response = await axios.post(
          url + `/api/verifiedPoints`,
          body
      );
      if (response.status === 201) {
        console.log(response);
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export default CrudPoints;
