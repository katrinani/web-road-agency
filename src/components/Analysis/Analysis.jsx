import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";
import AnalysisList from "./ListForAnalysis";

const Analysis = (props) => {
    // TO-DO: ХАРДКОД УБРАТЬ
    // const UnverifiedPoints = polesAndUnverifiedPoints()
    const UnverifiedPoints = [
        {
            "ID": "0cebea38-1297-4e10-b934-f1cbf0eefe1c",
            "Долгота": 59.8693905448016,
            "Дорога": "М-5 \"Урал\": Уфа - Челябинск",
            "Название": "1766",
            "Описание": "",
            "Регион": "Челябинская область",
            "Тип точки": [1],
            "Широта": 54.98215228182743
        },
        {
            "ID": "5d3fec98-c909-4507-9e22-329e63fd6147",
            "Долгота": 59.87995844832021,
            "Дорога": "М-5 \"Урал\": Уфа - Челябинск",
            "Название": "1767",
            "Описание": "",
            "Регион": "Челябинская область",
            "Тип точки": [3],
            "Широта": 54.97556812815027
        },
        {
            "Долгота": 59.8958484,
            "Широта": 54.9938383,
            "Тип точки": [8],
        }
    ]

    const segmentsMarkers = makeSegments(props.points_list);
    console.log(segmentsMarkers)

    return (
        <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            {/* карта*/}
            <AnalysisMap
                apiKey={props.apiKey}
                location={props.location}
                points_list={props.points_list}
                UnverifiedPoints={UnverifiedPoints}
                segmentsMarkers={segmentsMarkers}
            />
            {/*// Список всякого*/}
            <AnalysisList
                segmentsMarkers={segmentsMarkers}
            />
        </div>
    )
};

export default Analysis;