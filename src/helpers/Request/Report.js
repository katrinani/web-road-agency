import axios from "axios";
import url from "../url";
import {NotificationManager} from "react-notifications";
import handleError from "../Notifications";

class ReportPoints {
    static async ReportUnverifiedPoints(segments) {
        try {
            const single = []
            segments["single"] && segments["single"].forEach((segment) => (
                segment.map((point) => (single.push(point["marker"]["ID"])))
            ))
            let body = {
                "highStressAreas": segments["stressed"] && segments["stressed"].map((segment, index) => (
                        {
                            "name": `Напряженный участок ${index + 1}`,
                            "pointIds": segment.map((point) => (point["marker"]["ID"]))
                        }
                    )) || [],
                "moderateStressAreas": segments["medium"] && segments["medium"].map((segment, index) => (
                    {
                        "name": `Средний участок ${index + 1}`,
                        "pointIds": segment.map((point) => (point["marker"]["ID"]))
                    }
                )) || [],
                "pointsWithoutAreas":  single || [],
            }

            const response = await axios.post(
                url + "/unverified-points/report",
                body,
                {responseType: 'blob'}
            );

            if (response.status === 200) {
                console.log(response);
                NotificationManager.success('Успешно получено!');
            }

            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const downloadUrl = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'unverified-points.xlsx');

            return [link, downloadUrl];
        } catch (error) {
            console.log(error)
            handleError(error)
        }
    }
}

export default ReportPoints;