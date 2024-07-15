import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";
import AnalysisList from "./ListForAnalysis";
import {useEffect, useState} from "react";
import {Point} from "./Unverified";
import PointVerification from "./PointVerification";
import DescriptionPoint from "./DescriptionPoint";


const Analysis = (props) => {
    const [locationAnalysis, setLocationAnalysis] = useState({center: [61.400346, 55.163742], zoom: 11});
    const [rightPart, setRightPart] = useState("Список");
    const [IDSegmentChoose, setIDSegmentChoose] = useState('');
    const [markerChoose, setMarkerChoose] = useState();
    const [listIDs, setListIDs] = useState();

    // TODO: ХАРДКОД УБРАТЬ
    // const UnverifiedPoints = polesAndUnverifiedPoints()
    const UnverifiedPoints = Point

    const [filteredUnverifiedPoints, setFilteredUnverifiedPoints] = useState([]);
    console.log(filteredUnverifiedPoints);
    useEffect(() => {
        setFilteredUnverifiedPoints(UnverifiedPoints);
    }, [UnverifiedPoints]);
    console.log("Все точки", filteredUnverifiedPoints)

    const segmentsMarkers = makeSegments(filteredUnverifiedPoints);
    console.log(segmentsMarkers)

    const addTestPoint = (testPoint) => {
        setFilteredUnverifiedPoints(prevPoints => [...prevPoints, {
            "ID": testPoint.id,
            "Долгота": testPoint.coordinates.longitude,
            "Широта": testPoint.coordinates.latitude,
            "Название": testPoint.name,
            "Тип точки": [9]
        }]);
    };

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