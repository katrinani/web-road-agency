import React from "react";
import {ReliabilityLevels, unverifiedTypes, verifiedTypes} from "../../helpers/FormData";

const DescriptionPoint = (props) => {
    const marker = props.markerChoose;
    const date = new Date(marker["Дата"]);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center position-relative">
            <h3>Точка</h3>
            {/*Закрытие страницы*/}
            <img
                src="Icons/x-button.png"
                alt="Закрыть"
                style={{
                    width: '20px', height: '20px',
                    position: 'absolute', margin: '20px',
                    right: '0', top: '0'
                }}
                onClick={() => {
                    props.setRightPart("Список");
                }}
            />
            {marker["Название"] && <div>Название: {marker["Название"]}</div> ||
                marker["Описание"] && <div>Описание: {marker["Описание"]}</div>}
            <div>Тип точки: {unverifiedTypes[marker["Тип точки"][0]] || verifiedTypes[marker["Тип точки"][0]]}</div>
            <div>Координаты: {marker["Долгота"]}, {marker["Широта"]}</div>
            <div>Дорога: {marker["Дорога"]}</div>
            {marker["Регион"] && <div>Регион: {marker["Регион"]}</div> ||
                marker["Уровень доверия"] &&
                <div>Уровень доверия: {ReliabilityLevels[marker["Уровень доверия"] - 1]}</div>}
            {marker["Дата"] && (
                <div>
                    <label htmlFor="date"><h6>Дата создания:</h6></label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="date"
                        name="date"
                        // value={marker["Дата"].slice(0, -8)}
                        value={formattedDate}
                        disabled
                    />
                </div>
            )}
        </div>
    );
};

export default DescriptionPoint;