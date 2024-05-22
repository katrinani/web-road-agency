import axios from "axios";
import url from "./url";

const pointEditing = async (point) => {
    console.log(point)
    try {
        let body = {
            point: {
                name: point.Название,
                type: point.Тип,
                coordinates: {
                    latitude: point.Широта,
                    longitude: point.Долгота,
                },
                description: point.Описание || null,
            },
            regionName: point.Регион || null,
            newRoadName: point.Дорога || null,
        };
        console.log('Body: ', body)
        let mainUrl = `/api/verifiedPoints/${point.ID}`
        console.log(mainUrl)

        const response = await axios.put(
            url + mainUrl,
            body
    );
        if (response.status === 200) {
            console.log(response);
        }
    } catch (error) {
        console.log(error)
    }
}

export default pointEditing;