import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapMarker
} from "ymap3-components";
import React from "react";
import {icons} from "../../helpers/IconsData";


const Map = (props) => {  
  const handleMarkerClick = (marker) => {
    console.log(marker);
    props.setSelectedPoint(marker);
    props.setShowModal(true);
    props.setFormValues(marker)
  };

  return (
      <div className="map w-50 h-100 px-2">
        <YMapComponentsProvider apiKey={props.apiKey}>
          <YMap location={props.location}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {props.points_list &&
              props.points_list.map((marker, index) => (
                  <YMapMarker
                      coordinates={[marker["Долгота"], marker["Широта"]]}
                      key={index}
                      onClick={() => handleMarkerClick(marker)}
                  >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <img
                          src={icons[marker["Тип точки"][0]]}
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
  );
};

export default Map;
