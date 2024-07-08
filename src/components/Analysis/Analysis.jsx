import {makeSegments} from "../../helpers/Segments";
import AnalysisMap from "./MapForAnalysis";

const Analysis = (props) => {
    return (
        <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
        {/* карта*/}
        <AnalysisMap
            apiKey={props.apiKey}
            location={props.location}
            points_list={props.points_list}
        />
        {/*// Список всякого*/}
        </div>
    )
};
export default Analysis;