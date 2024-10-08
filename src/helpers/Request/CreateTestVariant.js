import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay,
});

const createTestVariant = async (IDs) => {
    try {
        let body = {
            "ids": IDs
        };
        const response = await axios.post(`${url}/verify`, body, {timeout: 5000});
        console.log(response);
        if (response.status === 200) {
            console.log("Пробный варинат успешно создан");
            NotificationManager.success("Успешно создано");
        }
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default createTestVariant;