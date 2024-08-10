import React from "react";
import {
    ExplanationForReliabilityLevels,
    ReliabilityLevels,
    unverifiedTypes,
    verifiedTypes
} from "../../../helpers/FormData";

const DescriptionPoint = (props) => {
    const marker = props.markerChoose;
    console.log(marker);
    const URLForPhoto = "http://213.171.29.33:5139/api/v1/Web/files/"

    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 position-relative"
        >
            <div className="d-flex  flex-column align-items-center">
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
                <div className="row">
                    <div className="col">
                        {/*Название или Описание*/}
                        {marker["Название"] && (
                                <div className="form-group">
                                    <label htmlFor="name"><h6>Название:</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={marker["Название"]}
                                        disabled
                                    />
                                </div>
                            )
                            || marker["Описание"] && (
                                <div className="form-group">
                                    <label htmlFor="description"><h6>Описание:</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={marker["Описание"]}
                                        disabled
                                    />
                                </div>
                            )
                        }

                        {/*Тип точки*/}
                        <div className="form-group">
                            <label htmlFor="type"><h6>Тип точки:</h6></label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                name="type"
                                value={unverifiedTypes[marker["Тип точки"][0]] || verifiedTypes[marker["Тип точки"][0]]}
                                disabled
                            />
                        </div>

                        {/*Координаты*/}
                        <div className="form-group">
                            <label htmlFor="coordinate"><h6>Координаты:</h6></label>
                            <input
                                type="text"
                                className="form-control"
                                id="coordinate"
                                name="coordinate"
                                value={`${marker["Долгота"]}, ${marker["Широта"]}`}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="col">
                        {/*Дорога*/}
                        <div className="form-group">
                            <label htmlFor="road"><h6>Дорога:</h6></label>
                            <input
                                title={marker["Дорога"]}
                                type="text"
                                className="form-control"
                                id="road"
                                name="road"
                                value={marker["Дорога"]}
                                disabled
                            />
                        </div>

                        {/*Регион или Уровень доверия*/}
                        {marker["Регион"] && (
                                <div className="form-group">
                                    <label htmlFor="region"><h6>Регион:</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="region"
                                        name="region"
                                        value={marker["Регион"]}
                                        disabled
                                    />
                                </div>
                            )
                            || marker["Уровень доверия"] && (
                                <div className="form-group">
                                    <label htmlFor="reliability"><h6>Уровень доверия:</h6></label>
                                    <input
                                        title={ExplanationForReliabilityLevels[marker["Уровень доверия"] - 1]}
                                        type="text"
                                        className="form-control"
                                        id="reliability"
                                        name="reliability"
                                        value={ReliabilityLevels[marker["Уровень доверия"] - 1]}
                                        disabled
                                    />
                                </div>
                            )}

                        {/*Дата создания*/}
                        {marker["Дата"] && (
                            <div className="form-group">
                                <label htmlFor="date"><h6>Дата создания:</h6></label>
                                <input
                                    type="datetime-local"
                                    step="1"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={marker["Дата"].split('.')[0]}
                                    disabled
                                />
                            </div>)
                        }
                    </div>
                </div>
            </div>

            {marker["Файлы"] && marker["Файлы"].length > 0 && (
                <div className="col align-items-start">
                    <div className="form-group">
                        <label htmlFor="photo"><h6>Фотографии:</h6></label>
                        <div className="d-flex overflow-x-auto" style={{
                            maxWidth: '480px'
                        }}>
                            {marker["Файлы"].map((file, index) => (
                                <div key={index} className="p-1">
                                    <img src={URLForPhoto + file} alt={file} height="200"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DescriptionPoint;