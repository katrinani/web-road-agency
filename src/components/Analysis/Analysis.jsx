import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./AnalysisMap/MapForAnalysis";
import AnalysisList from "./AnalysisList/ListForAnalysis";
import {useEffect, useRef, useState} from "react";
import PointVerification from "./PointVerification/PointVerification";
import DescriptionPoint from "./DescriptionPoint/DescriptionPoint";
import UnverifiedPoints from "../../helpers/Request/AllPolesAndUnverifiedPoints";
import ApprovedPoints from "../../helpers/Request/ApprovedPoints";


const Analysis = (props) => {
    const [locationAnalysis] = useState(
        {center: [61.400346, 55.163742], zoom: 11}
    );
    const [rightPart, setRightPart] = useState("Список");
    const static_form = useRef(false);
    const [markerChoose, setMarkerChoose] = useState();
    const [testPoint, setTestPoint] = useState(null);
    const [filteredUnverifiedPoints, setFilteredUnverifiedPoints] = useState([]);

    const addTestPoint = (testPoint) => {
        setFilteredUnverifiedPoints(prevPoints => [...prevPoints, {
            "ID": testPoint.id,
            "Долгота": testPoint.coordinates.longitude,
            "Широта": testPoint.coordinates.latitude,
            "Название": testPoint.name,
            "Тип точки": [9]
        }]);
    };

    useEffect(() => {
        setFilteredUnverifiedPoints(UnverifiedPoints.concat(ApprovedPoints));
    }, [UnverifiedPoints, ApprovedPoints]);  // при изменении невер точек
    console.log("Все точки", filteredUnverifiedPoints)

    const [segmentsMarkers, setSegmentsMarkers] = useState(makeSegments(filteredUnverifiedPoints))
    useEffect(() => {
        console.log("segmentsMarkers:", segmentsMarkers);
        setSegmentsMarkers(makeSegments(filteredUnverifiedPoints));
    }, [filteredUnverifiedPoints]);

    return (
        <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            {/*Карта*/}
            <AnalysisMap
                apiKey={props.apiKey}
                location={locationAnalysis}
                points={UnverifiedPoints.concat(ApprovedPoints)}
                filteredUnverifiedPoints={filteredUnverifiedPoints}
                setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
                segmentsMarkers={segmentsMarkers}
                setRightPart={setRightPart}
                setMarkerChoose={setMarkerChoose}
                rightPart={rightPart}
                setTestPoint={setTestPoint}
                setSegmentsMarkers={setSegmentsMarkers}
                static_form={static_form}
            />
            {/*Список участков*/}
            {rightPart === "Список" && (
                <AnalysisList
                    segmentsMarkers={segmentsMarkers}
                    setRightPart={setRightPart}
                    setTestPoint={setTestPoint}
                    static_form={static_form}
                />
            )}
            {/*Создание тестовой точки*/}
            {rightPart === "Тестовый вариант" && (
                <PointVerification
                    setRightPart={setRightPart}
                    addTestPoint={addTestPoint}
                    filteredUnverifiedPoints={filteredUnverifiedPoints}
                    setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
                    testPoint={testPoint}
                    static_form={static_form}
                />
            )}
            {/*Описание точки*/}
            {rightPart === "Описание точки" && (
                <DescriptionPoint
                    setRightPart={setRightPart}
                    markerChoose={markerChoose}
                />
            )}
        </div>
    )
};

export default Analysis;