import axios from "axios";
import url from "../url";
import handleError from "../Notifications";


const getAllPoints = async (roadName) => {
    try {
        const response = await axios.get(`${url}/api/roads/${roadName}/verifiedPoints`);
        console.log(`${url}/api/roads/${roadName}/verifiedPoints`)

        if (response.status === 200) {
            const points_list = response.data.points.map(point => ({
                "Широта": point.coordinates.latitude,
                "Долгота": point.coordinates.longitude,
                "Название": point.name
            }));

            console.log(points_list);

            return points_list;
        }
    } catch (error) {
        {
            handleError(error)
        }
    }
};

export default getAllPoints;
