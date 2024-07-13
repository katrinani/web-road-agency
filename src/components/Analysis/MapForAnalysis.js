import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature, YMapMarker
} from "ymap3-components";
import {iconsUnverified, iconsVerified} from "../../helpers/IconsPath";
import React from "react";
import FilterForAnalysis from "./FilterForAnalysis";

const AnalysisMap = (props) => {
    const handleMarkerClick = (marker) => {};
    const handleSegmentClick = (segment) => {
        const IDs = segment.map((point) => (point["marker"]["ID"]))
        props.setRightPart("Тестовый вариант")
        props.setListIDs(IDs)
    };

    return (
        <div className="map w-50 h-100 px-2 position-relative rounded">
            {/*Фильтры*/}
            <div className="position-absolute top-0 start-0 p-3" style={{zIndex: 1}}>
                <FilterForAnalysis
                    points={props.points}
                    filteredUnverifiedPoints={props.filteredUnverifiedPoints}
                    setFilteredUnverifiedPoints={props.setFilteredUnverifiedPoints}
                />
            </div>
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    {props.segmentsMarkers["stressed"] && (
                        props.segmentsMarkers["stressed"].map((segment, index) => (
                            <YMapFeature
                                key={index}
                                onClick={() => handleSegmentClick(segment)}
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={{stroke: [{color: '#d60000', width: 2}], fill: 'rgba(255,33,33,0.5)'}}/>
                        ))
                    )}
                    {props.segmentsMarkers["medium"] && (
                        props.segmentsMarkers["medium"].map((segment, index) => (
                            <YMapFeature
                                key={index}
                                onClick={() => handleSegmentClick(segment)}
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={{stroke: [{color: '#d67d00', width: 2}], fill: 'rgba(255,148,33,0.5)'}}/>
                        ))
                    )}
                    {props.filteredUnverifiedPoints &&
                        props.filteredUnverifiedPoints.map((marker, index) => (
                            <YMapMarker
                                coordinates={[marker["Долгота"], marker["Широта"]]}
                                key={index}
                                onClick={() => handleMarkerClick(marker)}
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {/*TODO учесть что в невер т нет названия*/}
                                    <img
                                        src={
                                            iconsUnverified[marker["Тип точки"][0]] || iconsVerified[marker["Тип точки"][0]]
                                        }
                                        alt={marker["Название"] || marker["Описание"]}
                                        style={{width: '30px', height: '30px', marginRight: '5px'}}
                                    />
                                    <span style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}>{marker["Название"] || marker["Описание"]}</span>
                                </div>
                            </YMapMarker>
                        ))}
                </YMap>
            </YMapComponentsProvider>
        </div>
    )
};

export default AnalysisMap;
