import {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapMarker, YMapCustomClusterer
} from "ymap3-components";
import {iconCluster, iconsVerified} from "../../../helpers/IconsPath";
import React, {useCallback, useEffect, useState} from "react";
import Filter from "./Filter";

const Map = (props) => {
    const [filteredPoints, setFilteredPoints] = useState([]);

    useEffect(() => {
        setFilteredPoints(props.points_list);
    }, [props.points_list]);
    console.log("Все точки", filteredPoints)

    const handleMarkerClick = (marker) => {
        console.log(marker);
        props.setSelectedPoint(marker);
        props.setShowModal(true);
        props.setFormValues(marker)
      };

    // Кластеризация
    const features = filteredPoints.map((marker) => ({
        type: "Feature",
        id: marker["ID"],
        geometry: {
            type: "Point",
            coordinates: [marker["Долгота"], marker["Широта"]]
        },
        point: marker
    }))

    const marker = useCallback(
        (feature) => (
            <YMapMarker
                coordinates={[feature.point["Долгота"], feature.point["Широта"]]}
                onClick={() => handleMarkerClick(feature.point)}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img
                        src={iconsVerified[feature.point["Тип точки"][0]]}
                        alt={feature.point["Название"]}
                        style={{width: '30px', height: '30px', marginRight: '5px'}}
                    />
                    <span style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '5px',
                        borderRadius: '5px'
                    }}>{feature.point["Название"]}</span>
                </div>
            </YMapMarker>
        ),
        []
    );

    const cluster = useCallback(
        (coordinates, features) => (
            <YMapMarker coordinates={coordinates}>
                <div style={{ position: 'relative', width: '35px', height: '35px' }}>
                    <img
                        src={iconCluster}
                        alt={features.length}
                        style={{ width: '100%', height: '100%'}}
                    />
                    <span style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        fontSize: '12px',
                    }}><b>{features.length}</b></span>
                </div>
            </YMapMarker>
        ), []);

    return (
        <div className="map w-50 h-100 px-2 position-relative">
            {/*Фильтр*/}
            <div className="position-absolute top-0 start-0 p-3" style={{zIndex: 1}}>
                <Filter
                    points_list={props.points_list}
                    filteredPoints={filteredPoints}
                    setFilteredPoints={setFilteredPoints}
                />
            </div>
            {/*Кнопка для списка*/}
            <div className="position-absolute top-0 end-0 p-3" style={{zIndex: 1}}>
                <button
                    className="btn btn-secondary"
                    onClick={() => props.setRightPart("Изучаем")}
                >Список всех точек</button>
            </div>
            {/*Карта*/}
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    {/*Кластеризатор*/}
                    <YMapCustomClusterer
                        marker={marker}
                        cluster={cluster}
                        gridSize={64}
                        features={features}
                        maxZoom={16}
                    />
                </YMap>
            </YMapComponentsProvider>
        </div>
    );
};

export default Map;
