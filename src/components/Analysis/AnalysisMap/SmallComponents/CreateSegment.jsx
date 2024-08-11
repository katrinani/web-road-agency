import React from "react";
import {URLForUndo} from "../../../../helpers/url";

const CreateSegment = (props) => {
    const segment = props.selectedCtrlPoints;

    const handleSubmit = () => {
        const newSegment = segment.map((point) => ({
            coordinate: [point["Долгота"], point["Широта"]],
            marker: point
        }))

        if (segment.length > 10) {
            // {medium: [], stressed: [+1]}
            props.setSegmentsMarkers(prevSegmentsMarkers => ({
                ...prevSegmentsMarkers,
                stressed: [...prevSegmentsMarkers.stressed, newSegment]
            }));
        } else if (segment.length <= 10) {
            // {medium: [+1], stressed: []}
            props.setSegmentsMarkers(prevSegmentsMarkers => ({
                ...prevSegmentsMarkers,
                medium: [...prevSegmentsMarkers.medium, newSegment]
            }))
        }
        props.setSelectedCtrlPoints([]);
        props.setMakeSegment("");  // убираем поле
    }

    return (
        <div
            style={{ width: 'fit-content', height: 'fit-content' }}
            className="p-2 shadow-sm bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center">
            <div className="d-flex flex-row">
                <b>Создать участок из точек:</b>
                {/*Закрытие страницы*/}
                <img
                    src={URLForUndo}
                    alt="Закрыть"
                    style={{
                        width: '10px', height: '10px',
                        margin: '5px'
                    }}
                    onClick={() => {
                        props.setSelectedCtrlPoints([]);
                        props.setMakeSegment("");
                    }}
                />
            </div>
            <ol>
                {segment.map((marker, index) => (
                    <li key={index}>"{marker["Описание"]}"</li>
                ))}
            </ol>
            <button onClick={() => handleSubmit()} className="btn btn-primary">Создать участок</button>
        </div>
)
};

export default CreateSegment;