import axios from "axios";
import url from "./url";

const getRegions = async () => {
    try {
        const response = await axios.get(`${url}/api/regions`);
        if (response.status === 200) {
            const regions = response.data.regions.map(region => region.name);
            console.log(regions);
            return regions;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Нет ни одного региона");
        } else {
            console.error("Произошла ошибка при получении регионов", error);
        }
    }
};

const regions = await getRegions()
export default regions