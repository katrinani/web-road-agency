import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature, YMapMarker
} from "ymap3-components";
import {iconsUnverified, iconsVerified} from "../../helpers/IconsPath";

const AnalysisMap = (props) => {
    const handleMarkerClick = (marker) => {};

    return (
        <div className="map w-50 h-100 px-2 position-relative rounded">
            {/*Фильтры*/}
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    {props.segmentsMarkers["stressed"] && (
                        props.segmentsMarkers["stressed"].map((segment) => (
                            <YMapFeature
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={{stroke: [{color: '#d60000', width: 2}], fill: 'rgba(255,33,33,0.5)'}}
                            />
                        ))
                    )}
                    {props.segmentsMarkers["medium"] && (
                        props.segmentsMarkers["medium"].map((segment) => (
                            <YMapFeature
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment.map((points) => (points["coordinate"]))]
                                }}
                                style={{stroke: [{color: '#d67d00', width: 2}], fill: 'rgba(255,148,33,0.5)'}}
                            />
                        ))
                    )}
                    {props.UnverifiedPoints &&
                        props.UnverifiedPoints.map((marker, index) => (
                            <YMapMarker
                                coordinates={[marker["Долгота"], marker["Широта"]]}
                                key={index}
                                onClick={() => handleMarkerClick(marker)}
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img
                                        src={
                                            marker["Тип точки"][0] !== 8 && iconsUnverified[marker["Тип точки"][0]] ||
                                            marker["Тип точки"][0] === 8 && iconsVerified[marker["Тип точки"][0]]
                                        }
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
    )
};

export default AnalysisMap;
