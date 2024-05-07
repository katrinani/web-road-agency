import axios from "axios";
import url from "./url";

const getRoads = async () => {
    try {
        const response = await axios.get(`${url}/api/roads`);
        if (response.status === 200) {
            const roadNames = response.data.roads.map(road => road.roadName);
            console.log(roadNames);
            return roadNames;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Нет ни одной дороги");
        } else {
            console.error("Произошла ошибка при получении дорог", error);
        }
    }
};

const roads = await getRoads()
export default roads