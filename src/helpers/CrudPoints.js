import axios from "axios";

const url = "https://smiling-striking-lionfish.ngrok-free.app";

class CrudPoints {
  static async createPoint(point) {

    let body = {
      point: {
        name: point["Название"],
        type: 0,
        coordinates: {
          latitude: point["Широта"],
          longitude: point["Долгота"],
        }
      },
    };

    const response = await axios.post(url + `/api/roads/${point["Дорога"]}/verifiedPoints`, body);

    console.log(response);
  }
}

export default CrudPoints;
