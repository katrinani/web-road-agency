import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";

const pointDeleting = async (point) => {
    console.log(point)
    try {
        let mainUrl = `/verifiedPoints/${point.ID}`
        console.log(mainUrl)

        const response = await axios.delete(
            url + mainUrl
        );
        if (response.status === 200) {
            console.log(response);
            NotificationManager.success('Успешно удалено');
        }
    } catch (error) {
        console.log(error)
        handleError(error)
    }
}

export default pointDeleting;