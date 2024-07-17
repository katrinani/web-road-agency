import React, {useEffect, useState} from "react";
import createTestVariant from "../../helpers/Request/CreateTestVariant";
import pointConfirmation from "../../helpers/Request/PointConfirmation";

const PointVerification = (props) => {
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

    // TODO убрать хардкод
    // const testPoint = await createTestVariant(props.listIDs);
    const testPoint = {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66af12",
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
            "/1675522840_www-funnyart-club-p-kot-mem-kartinki-4.jpg",
            "/thumbs/1675522854_www-funnyart-club-p-kot-mem-kartinki-21.jpg",
            "/1675522869_www-funnyart-club-p-kot-mem-kartinki-70.jpg",
            // "/1675522794_www-funnyart-club-p-kot-mem-kartinki-62.jpg"
        ],
        "urlForFiles": "https://www.funnyart.club/uploads/posts/2023-02"
    };

    useEffect(() => {
        if (testPoint && !props.filteredUnverifiedPoints.find(point => point.ID === testPoint.id)) {
            props.addTestPoint(testPoint);
        }
    }, [testPoint, props.filteredUnverifiedPoints]);

    const [selectedImageIndex, setSelectedImageIndex] = useState(testPoint.filesIds[0]);

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
            expirationTime: testPoint.expirationTime.slice(0, -1),
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
        // TODO eбрать хардкод
        // const response = await pointConfirmation(pointData, selectedImageIndex)
        const response = 200;
        if (response === 200) {
            // удаляем тестовую точку
            props.setFilteredUnverifiedPoints(prevPoints => prevPoints.filter(point => point.ID !== pointData.id));
            props.setRightPart("Список");
            props.setIDSegmentChoose('');
            // после обновления автоматом еще один запрос уже с подтвержденной точкой
        }
    }

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
                onClick={() => {
                    props.setRightPart("Список");
                    props.setFilteredUnverifiedPoints(prevPoints => prevPoints.filter(point => point.ID !== pointData.id));
                    props.setIDSegmentChoose('');
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
                                <option value="1">ДТП</option>
                                <option value="2">Недостатки дороги</option>
                                <option value="3">Преграда</option>
                                <option value="4">Противоправные действия 3х лиц</option>
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
                                onChange={(event) => handleCoordinatesChange(event, 'latitude')}
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
                                onChange={(event) => handleCoordinatesChange(event, 'longitude')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationTime">Время жизни точки:</label>
                            <input
                                type="datetime-local"
                                step=".1"
                                className="form-control"
                                id="expirationTime"
                                name="expirationTime"
                                value={pointData.expirationTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roadName">Дорога:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roadName"
                                name="roadName"
                                value={pointData.roadName}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                {/*TODO больше 3х фото и сьезжает, скрол не выходит*/}
                <div className="form-group">
                    <label htmlFor="photo">Фотографии:</label>
                    <div className="d-flex flex-row overflow-x-scroll" style={{maxWidth: '100%'}}>
                        {pointData.filesIds.map((file, index) => (
                            <div key={index} className="p-1 position-relative">
                                <img src={pointData.urlForFiles + file} alt={file} height="150"/>
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

                <button type="submit" className="btn btn-primary mt-3">
                    Создать точку
                </button>
            </form>
        </div>
    );
};

export default PointVerification;