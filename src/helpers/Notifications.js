import {NotificationManager} from "react-notifications";

function handleError(error) {
    console.log(error);
    if (error.response != null) {
        NotificationManager.error(error, "Ошибка");
    }
    if (error.response && ((error.response.status / 100 === 4))) {
        NotificationManager.warning(error.response.data.detail, 'Внимание!');
    } else if (error.response.status / 100 === 5) {
        NotificationManager.error(error.response.data.detail, 'Внимание!');
    } else {
        NotificationManager.error(error.response.statusText, 'Внимание!');
    }
}

export default handleError;

