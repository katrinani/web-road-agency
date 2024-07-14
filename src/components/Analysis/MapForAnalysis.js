import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature, YMapMarker
} from "ymap3-components";
import {iconsUnverified, iconsVerified, iconTestPoint} from "../../helpers/IconsPath";
import React, {useState} from "react";
import FilterForAnalysis from "./FilterForAnalysis";

const AnalysisMap = (props) => {
    const handleMarkerClick = (marker) => {};
    const handleSegmentClick = (segment, idSegment) => {
        const IDs = segment.map((point) => (point["marker"]["ID"]));
        props.setIDSegmentChoose(idSegment)
        props.setRightPart("Тестовый вариант");
        props.setListIDs(IDs);
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
                                id={`stressed-${index}`}
                                key={`stressed-${index}`}
                                onClick={() => handleSegmentClick(segment, `stressed-${index}`)}
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={
                                props.IDSegmentChoose === `stressed-${index}` ? {
                                                stroke: [{color: 'rgba(214,0,0,0.7)', width: 2, dash: [5, 10]}],
                                                fill: 'rgba(255,33,33,0.3)'
                                            } : {
                                    stroke: [{color: '#d60000', width: 2}],
                                    fill: 'rgba(255,33,33,0.5)'
                                }}
                            />
                        ))
                    )}
                    {props.segmentsMarkers["medium"] && (
                        props.segmentsMarkers["medium"].map((segment, index) => (
                            <YMapFeature
                                id={`medium-${index}`}
                                key={`medium-${index}`}
                                onClick={() => handleSegmentClick(segment, `medium-${index}`)}
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={
                                props.IDSegmentChoose === `medium-${index}` ? {
                                                stroke: [{color: 'rgba(214,125,0,0.7)', width: 2, dash: [5, 10]}],
                                                fill: 'rgba(255,148,33,0.3)'
                                            } : {
                                    stroke: [{color: '#d67d00', width: 2}],
                                    fill: 'rgba(255,148,33,0.5)'
                                }}
                            />
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
                                    <img
                                        src={
                                            iconsUnverified[marker["Тип точки"][0]] ||
                                            iconsVerified[marker["Тип точки"][0]] ||
                                            iconTestPoint
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
