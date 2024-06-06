import React, { useState, useEffect } from 'react';
import {point_types} from "../../helpers/FormData";

const ListPoints = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPoints, setFilteredPoints] = useState(props.points_list);

    useEffect(() => {
        const results = props.points_list.filter(point =>
            point["Название"].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPoints(results);
    }, [searchTerm, props.points_list]);

    const handleMarkerClick = (marker) => {
        console.log(marker);
        props.setSelectedPoint(marker);
        props.setShowModal(true);
        props.setFormValues(marker);
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск по названию"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                        Поиск
                    </button>
                </div>
            </div>
            <div className="h-100 px-2 overflow-auto">
                <ol>
                    {filteredPoints.map((marker, index) => (
                        <li key={index} onClick={() => handleMarkerClick(marker)}>
                            <div>Название: {marker["Название"]}</div>
                            <div>Координаты: {marker["Долгота"]}, {marker["Широта"]}</div>
                            <div>Тип точки: {point_types[marker["Тип"]]}</div>
                            <div>Дорога: {marker["Дорога"]}</div>
                            {marker["Тип"] === 5 && <div>Описание: {marker["Описание"] === "" ? 'Нет данных' : marker["Описание"]}</div>}
                            {marker["Тип"] === 8 && <div>Регион: {marker["Регион"] === "" ? 'Нет данных' : marker["Регион"]}</div>}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default ListPoints;
