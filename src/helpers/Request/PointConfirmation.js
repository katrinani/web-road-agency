import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay,
});

const pointConfirmation = async (pointData, selectedImageIndex) => {
    try {
        let body = {
            "name": pointData.name,
            "description": pointData.description,
            "expirationTime": pointData.expirationTime.split(".")[0] + ".9443764Z",
            "type": pointData.type,
            "coordinates": {
                "latitude": pointData.coordinates.latitude,
                "longitude": pointData.coordinates.longitude
            },
            "roadName":pointData.roadName,
            "fileId": selectedImageIndex
        }
        console.log("Тело запроса", body);
        const response = await axios.post(
            `${url}/verify/${pointData.id}/confirm`,
            body
        );
        console.log(response);
        if (response.status === 200) {
            console.log("Подтвержденная точка успешно создана");
            NotificationManager.success("Успешно создано");
        }
        return response.status;
    } catch (error) {
        handleError(error);
    }
};

export default pointConfirmation;