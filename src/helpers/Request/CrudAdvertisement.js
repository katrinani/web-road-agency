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
            const advert = prepareAdvert(newMessage).advertisement;
            console.log("Тело", advert);
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

    static async readAllAdvertisements() {
        try {
            const response = await axios.get(`${url}/advertisements`);
            console.log(response);
            if (response.status === 200) {
                const allAdvertisements = response.data["advertisements"].map((advertisement) => ({
                    id: advertisement.id,
                    title: advertisement.title,
                    description: advertisement.description,
                    regionName: advertisement.regionName,
                    roadName: advertisement.roadName,
                    createTime: advertisement.creationDate,
                    expirationTime: advertisement.expirationDate
                }))
                return allAdvertisements;
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
                "regionName": newMessage.locationType === "Регион" && newMessage.location || null,
                "roadName": newMessage.locationType === "Дорога" && newMessage.location || null,
                "expirationTime": newMessage.expireTime.toISOString()
            }
            console.log("Тело", body)
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