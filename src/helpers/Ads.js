// {
//     "advertisement": {
//       "title": "string",
//       "description": "string", // необязательный параметр
//       "regionName": "string", // обязательно должно быть или имя дороги, или имя региона. Оба одновременно не должны 
//                              // присутствовать или отсутствовать
//       "roadName": "string",
//       "expirationTime": "2024-05-19T14:26:52+05:00" // это просто пример, в каком формате должны быть дата и время 
//     }
//   }


import axios from "axios";
import url from "./url";

const sendAdvert = async (advert) => {
    try {
        const response = await axios.post(`${url}/api/advertisements`, advert);
        if (response.status === 201) {
            console.log('Объявление успешно отправлено')
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Не найдена дорога или регион");
        } else {
            console.error("Произошла ошибка при создании объявления", error);
        }
    }
};
export default sendAdvert;