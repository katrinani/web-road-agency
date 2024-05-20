import axios from "axios";
import { point_types } from "./FormData";
import url from "./url";

class CrudPoints {
  static async createPoint(point) {
    console.log(point["Тип точки"]);
    console.log(point["Тип точки"] === point_types[0]);
    console.log(point_types.indexOf(point["Тип точки"]));
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

    console.log(response);
  }
}

export default CrudPoints;
