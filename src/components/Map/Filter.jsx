import React, {useState} from "react";
import {point_types} from "../../helpers/FormData";
import {icons} from "../../helpers/IconsData";


const Filter = (props) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const handleSelectType = (typeId, event) => {
        event.stopPropagation();

        const currentIndex = selectedTypes.indexOf(typeId);
        const newSelectedTypes = [...selectedTypes];

        if (currentIndex === -1) {
            newSelectedTypes.push(typeId);
        } else {
            newSelectedTypes.splice(currentIndex, 1);
        }

        setSelectedTypes(newSelectedTypes);
        console.log("Выбранные фильтры ", newSelectedTypes);

        function exactlyThree(point) {
            return newSelectedTypes.includes(point_types[point["Тип точки"][0]]);
        }
        const filteringPoints = props.points_list.filter(exactlyThree);
        props.setFilteredPoints(filteringPoints);
    };

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                Фильтрация точек
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {point_types.map((type) => (
                    <li
                        key={point_types.indexOf(type)}
                        onClick={(e) => handleSelectType(type, e)}
                        className={`dropdown-item ${selectedTypes.includes(type) ? 'border-midnightblue' : ''}`}
                    >
                        <a className="dropdown-item" href="#">
                            <img
                                src={icons[point_types.indexOf(type)]}
                                alt={type}
                                style={{width: '25px', height: '25px', marginRight: '5px'}}
                            /> {type}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;