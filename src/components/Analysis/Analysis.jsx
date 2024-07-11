import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";
import AnalysisList from "./ListForAnalysis";
import {useEffect, useState} from "react";
import {Point} from "./Unverified";

const Analysis = (props) => {
    // TO-DO: ХАРДКОД УБРАТЬ
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
            {/* карта*/}
            <AnalysisMap
                apiKey={props.apiKey}
                location={props.location}
                points={UnverifiedPoints}
                filteredUnverifiedPoints={filteredUnverifiedPoints}
                setFilteredUnverifiedPoints={setFilteredUnverifiedPoints}
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