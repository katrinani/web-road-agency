import axios from "axios";
import url from "../url";
import handleError from "../Notifications";

const getRoads = async () => {
  try {
    const response = await axios.get(`${url}/api/roads`);
    if (response.status === 200) {
      const roadNames = response.data.roads.map((road) => road.roadName);
      console.log(roadNames);
      return roadNames;
    }
  } catch (error) {
    handleError(error);
  }
};
// TODO: убрать хардкод
// const roads = await getRoads();
const roads = ['М-5', 'А-310', 'Р-435', 'Р-645']
export default roads;
