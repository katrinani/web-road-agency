import axios from "axios";
import url from "../url";
import handleError from "../Notifications";

const getRoads = async () => {
  try {
    const response = await axios.get(`${url}/roads`);
    if (response.status === 200) {
      const roadNames = response.data.roads.map((road) => road.roadName);
      console.log(roadNames);
      return roadNames;
    }
  } catch (error) {
    handleError(error);
  }
};

const roads = await getRoads();
export default roads;
