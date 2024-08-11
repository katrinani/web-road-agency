import axios from "axios";
import url from "../url";
import handleError from "../Notifications";

const approvedPoints = async () => {
    try {
        const response = await axios.get(
            `${url}/approvedPoints`,
            {timeout: 5000}
        );

        if (response.status === 200) {
            return response.data["approvedPoints"].map((point) => ({
                "ID": point.id,
                "Название": point.name,
                "Описание": point.description,
                "Дата": point.expirationTime,
                "Тип точки": [point.type],
                "Количество источников": point.sourcesCount,
                "Подтверждение": point.isApproved,
                "Широта": point.coordinates.latitude,
                "Долгота": point.coordinates.longitude,
                "Дорога": point.roadName,
                "Файлы": point.fileIds
            }));
        }
    } catch (error) {
        console.log(error)
        handleError(error);
    }
};

const ApprovedPoints = await approvedPoints()
export default ApprovedPoints;
