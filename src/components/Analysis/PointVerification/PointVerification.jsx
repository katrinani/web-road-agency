import React, {useEffect, useState} from "react";
import pointConfirmation from "../../../helpers/Request/PointConfirmation";
import {URLForPhoto, URLForUndo} from "../../../helpers/url";
import {highways} from "../../../helpers/FormData";
import UnverifiedPoints from "../../../helpers/Request/AllPolesAndUnverifiedPoints";
import ApprovedPoints from "../../../helpers/Request/ApprovedPoints";

const PointVerification = (props) => {
    const testPoint = props.testPoint
    const [pointData, setPointData] = useState({
        id: '',
        name: '',
        description: '',
        type: '',
        coordinates: {
            latitude: '',
            longitude: '',
        },
        roadName: '',
        expirationTime: '',
        filesIds: [],
        urlForFiles: ''
    });

    useEffect(() => {
        if (testPoint && !props.filteredUnverifiedPoints.find(point => point.ID === testPoint.id)) {
            props.addTestPoint(testPoint);
        }
    }, [testPoint, props.filteredUnverifiedPoints]);

    const [selectedImageIndex, setSelectedImageIndex] = useState(testPoint.filesIds[0] || null);

    useEffect(() => {
        setPointData({
            id: testPoint.id,
            name: testPoint.name,
            description: testPoint.description,
            type: testPoint.type,
            coordinates: {
                latitude: testPoint.coordinates.latitude,
                longitude: testPoint.coordinates.longitude,
            },
            roadName: testPoint.roadName,
            expirationTime: testPoint.expirationTime,
            filesIds: testPoint.filesIds,
            urlForFiles: testPoint.urlForFiles
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setPointData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCoordinatesChange = (event, coordinate) => {
        const value = parseFloat(event.target.value);

        setPointData((prevState) => ({
            ...prevState,
            coordinates: {
                ...prevState.coordinates,
                [coordinate]: value,
            },
        }));
    };

    const handleFileChange = (file) => {
        setSelectedImageIndex(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(pointData);
        const response = await pointConfirmation(pointData, selectedImageIndex)
        if (response === 200) {
            // удаляем тестовую точку
            props.setFilteredUnverifiedPoints(prevPoints => prevPoints.filter(point => point.ID !== pointData.id));
            props.setFilteredUnverifiedPoints(UnverifiedPoints.concat(ApprovedPoints));
            props.setRightPart("Список");
        }
    }

    return (
        <div
            className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center">
            <h3>Верификация точки</h3>
            {/*Закрытие страницы*/}
            <img
                src={URLForUndo}
                alt="Закрыть"
                style={{
                    width: '20px', height: '20px',
                    position: 'absolute', margin: '20px',
                    right: '0', top: '0'
                }}
                onClick={() => {
                    props.setRightPart("Список");
                    props.setFilteredUnverifiedPoints(prevPoints => prevPoints.filter(point => point.ID !== pointData.id));
                }}
            />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Название:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={pointData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Описание:</label>
                            <textarea
                                style={{height: "100px"}}
                                className="form-control"
                                id="description"
                                name="description"
                                value={pointData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Тип точки:</label>
                            <select
                                className="form-control"
                                id="type"
                                name="type"
                                value={pointData.type}
                                onChange={handleInputChange}
                            >
                                <option value="0">ДТП</option>
                                <option value="1">Недостатки дороги</option>
                                <option value="2">Преграда</option>
                                <option value="3">Противоправные действия 3х лиц</option>
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="latitude">Широта:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="latitude"
                                name="latitude"
                                value={pointData.coordinates.latitude}
                                onChange={(event) =>
                                    handleCoordinatesChange(event, 'latitude')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Долгота:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="longitude"
                                name="longitude"
                                value={pointData.coordinates.longitude}
                                onChange={(event) =>
                                    handleCoordinatesChange(event, 'longitude')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationTime">Время жизни точки:</label>
                            <input
                                type="datetime-local"
                                step="1"
                                className="form-control"
                                id="expirationTime"
                                name="expirationTime"
                                value={pointData.expirationTime.split('.')[0]}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roadName">Дорога:</label>
                            <select
                                className="form-control"
                                id="roadName"
                                name="roadName"
                                value={pointData.roadName}
                                onChange={handleInputChange}
                            >
                                {highways.map((road, index) => (
                                    <option key={index} value={road}>{road}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {pointData.filesIds && pointData.filesIds.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="photo">Фотографии:</label>
                        <div className="d-flex overflow-x-auto" style={{
                            maxWidth: '500px'
                        }}>
                            {pointData.filesIds.map((file, index) => (
                                <div key={index} className="p-1 position-relative">
                                    <img src={URLForPhoto + file} alt={file} height="150"/>
                                    <div className="form-check position-absolute top-0 end-0">
                                        <input
                                            name="photo"
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`file-${index}`}
                                            style={{margin: '8px'}}
                                            value={index}
                                            checked={selectedImageIndex === file}
                                            onChange={() => handleFileChange(file)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mt-2">
                        Создать точку
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PointVerification;