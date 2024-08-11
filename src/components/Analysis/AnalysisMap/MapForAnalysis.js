import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature, YMapMarker,
    YMapCustomClusterer,
    YMapHintContext, YMapHint
} from "ymap3-components";
import {iconCluster, iconsApproved, iconsUnverified, iconsVerified, iconTestPoint} from "../../../helpers/IconsPath";
import React, {useCallback, useContext, useEffect, useState} from "react";
import FilterForAnalysis from "./SmallComponents/FilterForAnalysis";
import createTestVariant from "../../../helpers/Request/CreateTestVariant";
import CreateSegment from "./SmallComponents/CreateSegment";

const AnalysisMap = (props) => {
    const [selectedCtrlPoints, setSelectedCtrlPoints] = useState([]);
    const [makeSegment, setMakeSegment] = useState("");
    const getHint = useCallback((object) => object?.properties?.hint, []);

    // Всплывающее описание сегмента
    function HintWindow() {
        const hintContext = useContext(YMapHintContext);

        return hintContext && <div
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '5px',
                borderRadius: '5px'
            }}
            dangerouslySetInnerHTML={{__html: hintContext.hint}}
        />;
    }

    // Действие с точкой: Описание или создание сегмента
    const handleMarkerClick = (event, marker) => {
        if (event.ctrlKey) {
            if (marker["Тип точки"][0] !== 8 && !marker["Количество источников"]){
                setSelectedCtrlPoints(prevSelectedPoints =>
                    [...prevSelectedPoints.filter((point) => point["ID"] !== marker["ID"]), marker]
                )
            }
        } else {
            props.setMarkerChoose(marker);
            props.setRightPart("Описание точки");
        }
    };

    useEffect(() => {
        console.log("selectedCtrlPoints:", selectedCtrlPoints);
        if (selectedCtrlPoints.length === 1) {setMakeSegment("Создаем")}
    }, [selectedCtrlPoints]); // Зависит от selectedCtrlPoints

    // Действие с сегментом
    const handleSegmentClick = async (segment) => {
        const IDs = segment.map((point) => (point["marker"]["ID"]));
        const Point = await createTestVariant(IDs);
        console.log(Point);
        props.setTestPoint(Point);
        props.setRightPart("Тестовый вариант");
    };

    // Кластеризация
    const features = props.filteredUnverifiedPoints.map((marker) => ({
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
                onClick={(event) => handleMarkerClick(event, feature.point)}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img
                        src={
                            feature.point["Количество источников"] && iconsApproved[feature.point["Тип точки"][0]]||
                            iconsUnverified[feature.point["Тип точки"][0]] ||
                            iconsVerified[feature.point["Тип точки"][0]] ||
                            iconTestPoint
                        }
                        alt={feature.point["Название"] || feature.point["Описание"]}
                        style={{
                            width: feature.point["Количество источников"] && '42px' || '30px',
                            height: feature.point["Количество источников"] && '42px' || '30px',
                            marginRight: '5px'
                    }}
                    />
                    <span style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '5px',
                        borderRadius: '5px'
                    }}>{feature.point["Название"] || feature.point["Описание"]}</span>
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
        <div className="map w-50 h-100 px-2 position-relative rounded">
            {/*Фильтры*/}
            <div className="position-absolute top-0 start-0 p-3" style={{zIndex: 1}}>
                <FilterForAnalysis
                    points={props.points}
                    filteredUnverifiedPoints={props.filteredUnverifiedPoints}
                    setFilteredUnverifiedPoints={props.setFilteredUnverifiedPoints}
                />
            </div>
            {/*Окно для создания сегмента*/}
            {makeSegment === "Создаем" && (
                <div className="position-absolute bottom-0 end-0 p-2" style={{zIndex: 1}}>
                    <CreateSegment
                        selectedCtrlPoints={selectedCtrlPoints}
                        setMakeSegment={setMakeSegment}
                        setSelectedCtrlPoints={setSelectedCtrlPoints}
                        setSegmentsMarkers={props.setSegmentsMarkers}
                    />
                </div>
            )}
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    <YMapHint hint={getHint}>
                        <HintWindow />
                    </YMapHint>
                    {props.segmentsMarkers["stressed"] && (
                        props.segmentsMarkers["stressed"].map((segment, index) => (
                            <YMapFeature
                                id={`stressed-${index}`}
                                key={`stressed-${index}`}
                                onClick={() => handleSegmentClick(segment)}
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
                                properties={{hint: `Напряженный участок ${index + 1}`}}
                            />
                        ))
                    )}
                    {props.segmentsMarkers["medium"] && (
                        props.segmentsMarkers["medium"].map((segment, index) => (
                            <YMapFeature
                                id={`medium-${index}`}
                                key={`medium-${index}`}
                                onClick={() => handleSegmentClick(segment)}
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
                                properties={{hint: `Участок средней напряженности ${index + 1}`}}
                            />
                        ))
                    )}
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

export default AnalysisMap;
