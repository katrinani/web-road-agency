import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";

const deleteUnverified = async (id) => {
    try {
        const response = await axios.delete(`${url}/unverified-points/${id}`);
        console.log(response);
        if (response.status === 204) {
            console.log("Объявление успешно удалено");
            NotificationManager.success("Успешно удалено");
        }
    } catch (error) {
        handleError(error);
    }
};

export default deleteUnverified;
