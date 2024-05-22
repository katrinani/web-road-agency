/*Удаление верифицированной точки:
URL - /api/verifiedPoints/{verifiedPointId}
HTTP-Method - DELETE
Параметры запроса:
Route:
verifiedPointId - UUID точки, которую нужно удалить
Ответ сервера:
Возможные статус-коды:
200 OK - всё отработало в штатном режиме
400 Bad Request - параметр roadName невалиден
404 Not Found - не была найдена или дорога с таким именем, либо точка с таким ID на этой дороге
Также все указанные функции могут ответить с статус-кодом 500 Internal Server Error. Это значит, что произошла внеплановая ошибка, нужно сообщить команде бэкенда, чтобы они поправили.*/
import axios from "axios";
import url from "./url";

const pointDeleting = async (point) => {
    console.log(point)
    try {
        let mainUrl = `/api/verifiedPoints/${point.ID}`
        console.log(mainUrl)

        const response = await axios.delete(
            url + mainUrl
        );
        if (response.status === 200) {
            console.log(response);
        }
    } catch (error) {
        console.log(error)
    }
}

export default pointDeleting;