import React, { useState } from "react";
import {unverifiedTypes, verifiedTypes} from "../../helpers/FormData";
import {iconsReliability, iconsUnverified, iconsVerified} from "../../helpers/IconsPath";
import {Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterForAnalysis = (props) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedReliabilityLevels, setSelectedReliabilityLevels] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const ReliabilityLevels = [
        "Низкий уровень",
        "Средний уровень (Файл)",
        "Средний уровень (Локация)",
        "Высокий уровень"
    ]

    const ExplanationForReliabilityLevels = [
        "У точки нет ни прикрепленного файла, ни нынешней локации",
        "У точки есть только прикрепленый файл",
        "У точки есть только нынешняя локация",
        "У точки есть и прикрепленный файл, и нынешняя локация"
    ]

    const handleSelectType = (typeId, event) => {
        event.stopPropagation();
        toggleSelection(selectedTypes, setSelectedTypes, typeId);
    };

    const handleSelectReliabilityLevel = (reliabilityLevel, event) => {
        event.stopPropagation();
        toggleSelection(selectedReliabilityLevels, setSelectedReliabilityLevels, reliabilityLevel);
    };

    const handleSelectCreationTime = (dates, event) => {
        // [startDate, endDate]
        event.stopPropagation();
        setStartDate(dates[0]);
        setEndDate(dates[1]);
    };

    const toggleSelection = (selectedArray, setSelection, value) => {
        const currentIndex = selectedArray.indexOf(value);
        const newSelectedArray = [...selectedArray];

        if (currentIndex === -1) {
            newSelectedArray.push(value);
        } else {
            newSelectedArray.splice(currentIndex, 1);
        }

        setSelection(newSelectedArray);
    };

    const filterPoints = () => {
        const filteredPoints = props.points.filter(point => {
            const typeMatch = selectedTypes.length === 0
                || selectedTypes.includes(unverifiedTypes[point["Тип точки"][0]])
                || selectedTypes.includes(verifiedTypes[point["Тип точки"][0]]);
            const reliabilityMatch = selectedReliabilityLevels.length === 0
                || selectedReliabilityLevels.includes(point["Уровень доверия"]);
            const pointDate = new Date(point["Дата"]);
            const creationTimeMatch = startDate && endDate
                ? pointDate >= startDate && pointDate <= endDate
                : true;
            return typeMatch && reliabilityMatch && creationTimeMatch;
        });
        props.setFilteredUnverifiedPoints(filteredPoints);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Фильтрация точек
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {/* Фильтрация по типу */}
                <div className="accordion" id="type">
                    <div className="accordion-item">
                        <div className="accordion-header" id="heading-type">
                            <Button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse-type" aria-expanded="true"
                                    aria-controls="collapse-type"
                                    onClick={(e) => e.stopPropagation()}
                            >По типу точек:</Button>
                        </div>
                        <div id="collapse-type" className="accordion-collapse collapse show"
                             aria-labelledby="heading-type"
                             data-bs-parent="#accordion-type">
                            <div className="accordion-body">
                                {unverifiedTypes.map((type) => (
                                    <li
                                        key={unverifiedTypes.indexOf(type)}
                                        onClick={(e) => handleSelectType(type, e)}
                                        className={`dropdown-item ${
                                            selectedTypes.includes(type) ? "border-midnightblue" : ""
                                        }`}
                                    >
                                        <a className="dropdown-item" href="#">
                                            <img
                                                src={iconsUnverified[unverifiedTypes.indexOf(type)]}
                                                alt={type}
                                                style={{width: "25px", height: "25px", marginRight: "5px"}}
                                            />{" "}
                                            {type}
                                        </a>
                                    </li>
                                ))}
                                {/*Тип километра*/}
                                <li
                                    key={8}
                                    onClick={(e) => handleSelectType('Километр', e)}
                                    className={`dropdown-item ${
                                        selectedTypes.includes('Километр') ? "border-midnightblue" : ""
                                    }`}
                                >
                                    <a className="dropdown-item" href="#">
                                        <img
                                            src={iconsVerified[8]}
                                            alt="Километровый столб"
                                            style={{width: "25px", height: "25px", marginRight: "5px"}}
                                        />{" "}
                                        Километр
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Фильтрация по уровню доверия */}
                <div className="accordion" id="level">
                    <div className="accordion-item">
                        <div className="accordion-header" id="heading-level">
                            <Button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse-level" aria-expanded="true"
                                    aria-controls="collapse-level"
                                    onClick={(e) => e.stopPropagation()}
                            >По уровню доверия:</Button>
                        </div>
                        <div id="collapse-level" className="accordion-collapse collapse show"
                             aria-labelledby="heading-level"
                             data-bs-parent="#accordion-level">
                            <div className="accordion-body">
                                {ReliabilityLevels.map((reliabilityLevel, index) => (
                                    <li
                                        key={ReliabilityLevels.indexOf(reliabilityLevel) + 1}
                                        title={ExplanationForReliabilityLevels[index]}
                                        onClick={(e) =>
                                            handleSelectReliabilityLevel(ReliabilityLevels.indexOf(reliabilityLevel) + 1, e)}
                                        className={`dropdown-item ${
                                            selectedReliabilityLevels.includes(ReliabilityLevels.indexOf(reliabilityLevel) + 1)
                                                ? "border-midnightblue"
                                                : ""
                                        }`}>
                                        <a className="dropdown-item" href="#">
                                            <img
                                                src={iconsReliability[ReliabilityLevels.indexOf(reliabilityLevel)]}
                                                alt={reliabilityLevel}
                                                style={{width: "25px", height: "25px", marginRight: "5px"}}
                                            />
                                            {reliabilityLevel}
                                        </a>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Фильтрация по времени создания  */}
                <div className="accordion" id="data">
                    <div className="accordion-item">
                        <div className="accordion-header" id="heading-data">
                            <Button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse-data" aria-expanded="true"
                                    aria-controls="collapse-data"
                                    onClick={(e) => e.stopPropagation()}
                            >По дате создания:</Button>
                        </div>
                        <div id="collapse-data" className="accordion-collapse collapse show"
                             aria-labelledby="heading-data"
                             data-bs-parent="#accordion-data">
                            <div className="accordion-body">
                                <li>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleSelectCreationTime}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline
                                    />
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
                <li style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="btn btn-primary mt-2" onClick={filterPoints}>
                        Применить фильтры
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default FilterForAnalysis;