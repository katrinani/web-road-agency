import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";


const pointConfirmation = async (pointData, selectedImageIndex) => {
    try {
        let body = {

            "name": pointData.name,
            "description": pointData.description,
            "expirationTime": pointData.expirationTime + 'Z',
            "type": pointData.type,
            "coordinates": {
                "latitude": pointData.coordinates.latitude,
                "longitude": pointData.coordinates.longitude
            },
            "fileId": selectedImageIndex
        }
        console.log("Тело запроса", body);
        const response = await axios.post(
            `${url}/verify/${pointData.id}/confirm'`,
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