import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";


const createTestVariant = async (IDs) => {
    try {
        let body = {
            "ids": IDs
        }
        const response = await axios.post(`${url}/verify`, body);
        console.log(response);
        if (response.status === 201) {
            console.log("Пробный варинат успешно создан");
            NotificationManager.success("Успешно создано");
        }
        return response;
    } catch (error) {
        handleError(error);
    }
};

export default createTestVariant;