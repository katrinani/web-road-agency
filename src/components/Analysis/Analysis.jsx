import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";
import AnalysisList from "./ListForAnalysis";
import {useEffect, useState} from "react";
import {Point} from "./Unverified";
import PointVerification from "./PointVerification";
import DescriptionPoint from "./DescriptionPoint";


const Analysis = (props) => {
    const [locationAnalysis, setLocationAnalysis] = useState(
        {center: [61.400346, 55.163742], zoom: 11}
    );
    const [rightPart, setRightPart] = useState("Список");
    const [IDSegmentChoose, setIDSegmentChoose] = useState('');
    const [markerChoose, setMarkerChoose] = useState();
    const [listIDs, setListIDs] = useState();
    const [filteredUnverifiedPoints, setFilteredUnverifiedPoints] = useState([]);
    const segmentsMarkers = makeSegments(filteredUnverifiedPoints);
    console.log(segmentsMarkers)

    // TODO: ХАРДКОД УБРАТЬ
    // const UnverifiedPoints = polesAndUnverifiedPoints()
    const UnverifiedPoints = Point
    // if (UnverifiedPoints?.length > 0) {
    //     const lastPoint = UnverifiedPoints[UnverifiedPoints.length - 1];
    //     setLocationAnalysis({ center: [lastPoint["Долгота"], lastPoint["Широта"]], zoom: 11 });
    // }

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
        setFilteredUnverifiedPoints(UnverifiedPoints);
    }, [UnverifiedPoints]);
    console.log("Все точки", filteredUnverifiedPoints)

    return (
        <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            {/*Карта*/}
            <AnalysisMap
                apiKey={props.apiKey}
                location={locationAnalysis}
                points={UnverifiedPoints}
                filteredUnverifiedPoints={filteredUnverifiedPoints}
                setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
                segmentsMarkers={segmentsMarkers}
                setRightPart={setRightPart}
                setListIDs={setListIDs}
                IDSegmentChoose={IDSegmentChoose}
                setIDSegmentChoose={setIDSegmentChoose}
                setMarkerChoose={setMarkerChoose}

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
                    addTestPoint={addTestPoint}
                    filteredUnverifiedPoints={filteredUnverifiedPoints}
                    setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
                    setIDSegmentChoose={setIDSegmentChoose}
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