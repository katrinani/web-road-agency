import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature, YMapMarker
} from "ymap3-components";
import {iconsUnverified, iconsVerified} from "../../helpers/IconsPath";
import {makeSegments} from "../../helpers/Segments";
import polesAndUnverifiedPoints from "../../helpers/Request/AllPolesAndUnverifiedPoints";

const AnalysisMap = (props) => {
    // TO-DO: ХАРДКОД УБРАТЬ
    // const UnverifiedPoints = polesAndUnverifiedPoints()
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
            "Название": "1767",
            "Описание": "",
            "Регион": "Челябинская область",
            "Тип точки": [3],
            "Широта": 54.97556812815027
        },
        {
            "Долгота": 59.8958484,
            "Широта": 54.9938383,
            "Тип точки": [8],
        }
    ]

    const segmentsMarkers = makeSegments(props.points_list);
    console.log(segmentsMarkers)

    const handleMarkerClick = (marker) => {};

    return (
        <div className="map w-50 h-100 px-2 position-relative">
            {/*Фильтры*/}
            <YMapComponentsProvider apiKey={props.apiKey}>
                <YMap location={props.location}>
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    {segmentsMarkers["stressed"] && (
                        segmentsMarkers["stressed"].map((segment) => (
                            <YMapFeature
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment]
                                }}
                                style={{stroke: [{color: '#d60000', width: 2}], fill: 'rgba(255,33,33,0.5)'}}
                            />
                        ))
                    )}
                    {segmentsMarkers["medium"] && (
                        segmentsMarkers["medium"].map((segment) => (
                            <YMapFeature
                                geometry={{
                                    type: 'Polygon',
                                    coordinates: [segment]
                                }}
                                style={{stroke: [{color: '#d67d00', width: 2}], fill: 'rgba(255,148,33,0.5)'}}
                            />
                        ))
                    )}
                    {UnverifiedPoints &&
                        UnverifiedPoints.map((marker, index) => (
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
