import axios from "axios";

const url = "https://smiling-striking-lionfish.ngrok-free.app";

class CrudPoints {
  static async createPoint(point) {
    let body = {
      point: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        type: point["Тип точки"],
        coordinates: {
          latitude: point["Широта"],
          longitude: point["Долгота"],
        },
        road: {
          roadName: point["Дорога"],
        },
        description: "default",
      },
    };

    const response = await axios(url + "/api/UnverifiedPoints", body);

    console.log(response);
  }
}

export default CrudPoints;
