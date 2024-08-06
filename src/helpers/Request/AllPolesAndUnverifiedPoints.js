import axios from "axios";
import url from "../url";
import handleError from "../Notifications";

const polesAndUnverifiedPoints = async () => {
    try {
        const response = await axios.get(
            `${url}/polesAndUnverifiedPoints`
        );

        if (response.status === 200) {
            const kilometerPoles = response.data["kilometerPoles"].map((point) => ({
                "ID": point.id,
                "Название": point.name,
                "Тип точки": [point.type],
                "Широта": point.coordinates.latitude,
                "Долгота": point.coordinates.longitude,
                "Дорога": point.roadName,
                "Регион": point.regionName
            }))
            const unverifiedPoints =  response.data["unverifiedPoints"].map((point) => ({
                "ID": point.id,
                "Описание": point.description,
                "Широта": point.coordinates.latitude,
                "Долгота": point.coordinates.longitude,
                "Тип точки": [point.type],
                "Уровень доверия": point.reliabilityLevel,
                "Дорога": point.roadName,
            }))
            return unverifiedPoints.concat(kilometerPoles);
        }
    } catch (error) {
        console.log(error)
        handleError(error);
    }
};


const UnverifiedPoints = await polesAndUnverifiedPoints()
export default UnverifiedPoints;
