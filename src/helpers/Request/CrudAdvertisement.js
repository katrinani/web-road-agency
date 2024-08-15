import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay,
});

const prepareAdvert = (newMessage) => {
    const { locationType, location, title, description, expireTime } = newMessage;
    const expirationTime = expireTime.toISOString();
    console.log(expirationTime);
    const advertisement = {
        title,
        description: description || "",
    };
    if (locationType === "Дорога") {
        advertisement.roadName = location;
        advertisement.regionName = null;
    } else if (locationType === "Регион") {
        advertisement.regionName = location;
        advertisement.roadName = null;
    }
    advertisement.expirationTime = expirationTime;
    console.log(advertisement);
    return { advertisement };
};


class CrudAdvertisement {
    static async createAdvertisement(newMessage) {
        try {
            const advert = prepareAdvert(newMessage);
            const response = await axios.post(`${url}/advertisements`, advert);
            console.log(response);
            if (response.status === 201) {
                console.log("Объявление успешно отправлено");
                NotificationManager.success("Успешно создано");
            }
        } catch (error) {
            handleError(error);
        }
    };

    static async updateAdvertisement(newMessage) {
        try {
            let body = {
                "title": newMessage.title,
                "description": newMessage.description,
                "regionName": newMessage.locationType === "Дорога" && newMessage.roadName || null,
                "roadName": newMessage.locationType === "Регион" && newMessage.regionName || null,
                "expirationTime": newMessage.expireTime
            }
            const response = await axios.put(`${url}/advertisements/${newMessage.id}`, body);
            console.log(response);
            if (response.status === 200) {
                console.log("Объявление успешно отредактировано");
                NotificationManager.success("Успешно отредактировано");
            }
        } catch (error) {
            handleError(error);
        }
    };

    static async deleteAdvertisement(id) {
        try {
            const response = await axios.delete(`${url}/advertisements/${id}`);
            console.log(response);
            if (response.status === 200) {
                console.log("Объявление успешно удалено");
                NotificationManager.success("Успешно удалено");
            }
        } catch (error) {
            handleError(error);
        }
    };
}

export default CrudAdvertisement;