import React from "react";
import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapMarker
} from "ymap3-components";
import {iconsUnverified} from "../../helpers/IconsPath";
import polesAndUnverifiedPoints from "../../helpers/Request/AllPolesAndUnverifiedPoints";

const Analysis = (props) => {
    // const UnverifiedPoints = polesAndUnverifiedPoints()
    // TO-DO: ХАРДКОД УБРАТЬ
    const UnverifiedPoints = [
        {
            "ID": "0cebea38-1297-4e10-b934-f1cbf0eefe1c",
            "Долгота": 59.8693905448016,
            "Дорога": "М-5 \"Урал\": Уфа - Челябинск",
            "Название": "1766",
            "Описание": "",
            "Регион": "Челябинская область",
            "Тип точки": [1],
            "Широта": 54.98215228182743
        },
        {
            "ID": "5d3fec98-c909-4507-9e22-329e63fd6147",
            "Долгота": 59.87995844832021,
            "Дорога": "М-5 \"Урал\": Уфа - Челябинск",
            "Название": "\"1767\"",
            "Описание": "",
            "Регион": "Челябинская область",
            "Тип точки": [3],
            "Широта": 54.97556812815027
        },
    ]
    const handleMarkerClick = (marker) => {};

    return (
        // карта
        <div className="map w-50 h-100 px-2 position-relative">
            {/*Фильтры*/}
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    {UnverifiedPoints &&
                        UnverifiedPoints.map((marker, index) => (
                            <YMapMarker
                                coordinates={[marker["Долгота"], marker["Широта"]]}
                                key={index}
                                onClick={() => handleMarkerClick(marker)}
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img
                                        src={iconsUnverified[marker["Тип точки"][0]]}
                                        alt={marker["Название"]}
                                        style={{width: '30px', height: '30px', marginRight: '5px'}}
                                    />
                                    <span style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}>{marker["Название"]}</span>
                                </div>
                            </YMapMarker>
                        ))}
                </YMap>
            </YMapComponentsProvider>
        </div>
        // Список всякого
    )
};
export default Analysis;