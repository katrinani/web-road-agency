import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";
import AnalysisList from "./ListForAnalysis";
import {useEffect, useState} from "react";
import {Point} from "./Unverified";
import PointVerification from "./PointVerification";


const Analysis = (props) => {
    const [rightPart, setRightPart] = useState("Список");
    const [listIDs, setListIDs] = useState();

    // TODO: ХАРДКОД УБРАТЬ
    // const UnverifiedPoints = polesAndUnverifiedPoints()
    const UnverifiedPoints = Point

    const [filteredUnverifiedPoints, setFilteredUnverifiedPoints] = useState([]);
    useEffect(() => {
        setFilteredUnverifiedPoints(UnverifiedPoints);
    }, [UnverifiedPoints]);
    console.log("Все точки", filteredUnverifiedPoints)

    const segmentsMarkers = makeSegments(filteredUnverifiedPoints);
    console.log(segmentsMarkers)

    return (
        <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            {/*Карта*/}
            <AnalysisMap
                apiKey={props.apiKey}
                location={props.location}
                points={UnverifiedPoints}
                filteredUnverifiedPoints={filteredUnverifiedPoints}
                setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
                segmentsMarkers={segmentsMarkers}
                setRightPart={setRightPart}
                setListIDs={setListIDs}
            />
            {/*Список участков*/}
            {rightPart === "Список" && (
                <AnalysisList
                    segmentsMarkers={segmentsMarkers}
                    setRightPart={setRightPart}
                    setListIDs={setListIDs}
                />
            )}
            {/*Создание тестовой точки*/}
            {rightPart === "Тестовый вариант" && (
                <PointVerification
                    listIDs={listIDs}
                    setRightPart={setRightPart}
                />
            )}
        </div>
    )
};

export default Analysis;