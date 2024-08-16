import React, { useState, useEffect } from 'react';
import {verifiedTypes} from "../../../helpers/FormData";
import {URLForUndo} from "../../../helpers/url";

const ListPoints = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPoints, setFilteredPoints] = useState(props.points_list);

    useEffect(() => {
        const results = props.points_list.filter(point =>
            point["Название"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            verifiedTypes[point["Тип точки"][0]].toLowerCase().includes(searchTerm.toLowerCase()) ||
            point["Дорога"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            point["Описание"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            point["Регион"].toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="p-4 w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-center position-relative">
            {/*Закрытие страницы*/}
            <img
                src={URLForUndo}
                alt="Закрыть"
                style={{
                    width: '20px', height: '20px',
                    position: 'absolute',
                    margin: '9px',
                    right: '0', top: '0'
                }}
                onClick={() => {
                    props.setRightPart("Создаем");
                }}
            />
            <div className="input-group mb-3 mt-3">
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
                        <li className="mb-2" key={index} onClick={() => handleMarkerClick(marker)}>
                            <div><b>Название:</b> {marker["Название"]}</div>
                            <div>Координаты: {marker["Долгота"]}, {marker["Широта"]}</div>
                            <div>Тип точки: {verifiedTypes[marker["Тип точки"][0]]}</div>
                            <div>Дорога: {marker["Дорога"]}</div>
                            {marker["Описание"] !== "" && <div>Описание: {marker["Описание"]}</div>}
                            {marker["Регион"] !== "" && <div>Регион: {marker["Регион"]}</div>}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};


export default ListPoints;
