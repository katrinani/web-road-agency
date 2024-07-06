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
    const UnverifiedPoints = polesAndUnverifiedPoints()
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
                                    {/*TO-DO: Какой номер какому типу соответствует*/}
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