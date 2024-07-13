import React, {useEffect, useState} from "react";
import createTestVariant from "../../helpers/Request/CreateTestVariant";

const PointVerification = (props) => {
    // TODO убрать хардкод
    console.log(props.listIDs);
    // const testPoint = await createTestVariant(props.listIDs);
    const testPoint = {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "ДТП",
        "description": "Тут жопа на дороге",
        "expirationTime": "2024-07-13T07:14:27.594Z",
        "type": 1,
        "coordinates": {
            "latitude": 55.240413,
            "longitude": 61.398820
        },
        "roadName": "М-5 \"Урал\" ПкЕ: Челябинск - Екатеринбург",
        "filesIds": [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        "urlForFiles": "string"
    };

    // <label htmlFor="expirationTime">Время жизни точки:</label>
    // <input type="datetime-local" id="expirationTime" name="expirationTime" required/>
    const handleSubmit = (event) => {
        event.preventDefault();}
    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center position-relative">
            <h3>Верификация точки</h3>
            {/*Закрытие страницы*/}
            <img
                src="Icons/x-button.png"
                alt="Закрыть"
                style={{
                    width: '20px', height: '20px',
                    position: 'absolute', margin: '20px',
                    right: '0', top: '0'
                }}
                onClick={() => props.setRightPart("Список")}
            />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Название</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={testPoint.name}
                                // onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Описание</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={testPoint.description}
                                // onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Тип точки</label>
                            <select
                                className="form-control"
                                id="type"
                                name="type"
                                value={testPoint.type}
                                // onChange={handleInputChange}
                            >
                                <option value="1">ДТП</option>
                                <option value="2">Недостатки дороги</option>
                                <option value="3">Преграда</option>
                                <option value="4">Противоправные действия 3х лиц</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="roadName">Дорога</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roadName"
                                name="roadName"
                                value={testPoint.roadName}
                                // onChange={handleInputChange}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="latitude">Широта</label>
                            <input
                                type="text"
                                className="form-control"
                                id="latitude"
                                name="latitude"
                                value={testPoint.coordinates.latitude}
                                // onChange={(event) => handleCoordinatesChange(event, 'latitude')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Долгота</label>
                            <input
                                type="text"
                                className="form-control"
                                id="longitude"
                                name="longitude"
                                value={testPoint.coordinates.longitude}
                                // onChange={(event) => handleCoordinatesChange(event, 'longitude')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expirationTime">Время жизни точки</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="expirationTime"
                                name="expirationTime"
                                value={testPoint.expirationTime}
                                // onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/*<div className="form-group mt-3">*/}
                {/*    <div className="d-flex flex-row overflow-auto">*/}
                {/*        {files.map((file) => (*/}
                {/*            <div key={file.id} className="p-1">*/}
                {/*                <img src={file.url} alt={file.name} width="100"/>*/}
                {/*                <div className="form-check">*/}
                {/*                    <input*/}
                {/*                        className="form-check-input"*/}
                {/*                        type="checkbox"*/}
                {/*                        id={`file-${file.id}`}*/}
                {/*                        value={file.id}*/}
                {/*                        checked={pointData.filesIds.includes(file.id)}*/}
                {/*                        // onChange={(event) => handleFileChange(event, file.id)}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}

                <button type="submit" className="btn btn-primary mt-3">
                    Создать точку
                </button>
            </form>
        </div>
    );
};

export default PointVerification;