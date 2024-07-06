import axios from "axios";
import url from "../url";
import handleError from "../Notifications";

const getAllPoints = async (coordinate) => {
  try {
    let latitude = `?Coordinates.Latitude=${coordinate.center[1]}`
    let longitude = `&Coordinates.Longitude=${coordinate.center[0]}`
    let radius = `&RadiusInKm=${250}`
    let params = latitude + longitude + radius
    console.log(`${url}/verifiedPoints`);
    const response = await axios.get(
      `${url}/verifiedPoints` + params
    );


    if (response.status === 200) {
      const points_list = Array.isArray(response.data.points) ? response.data.points.map((point) => ({
        "Широта": point.coordinates.latitude,
        "Долгота": point.coordinates.longitude,
        "Название": point.name,
        "ID": point.id,
        "Тип точки": [point.type],
        "Описание": point.description,
        "Дорога": point.roadName,
        "Регион": point.regionName
      })) : [];

      return points_list;
    }
  } catch (error) {
      console.log(error)
      handleError(error);
  }
};


export default getAllPoints;
