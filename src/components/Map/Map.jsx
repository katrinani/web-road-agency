import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from "ymap3-components";
import React from "react";


const Map = (props) => {  
  const handleMarkerClick = (marker) => {
    console.log(marker);
    props.setSelectedPoint(marker);
    console.log(marker);
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
                <YMapDefaultMarker
                  onClick={() =>
                    handleMarkerClick(marker)
                  }
                  key={index}
                  coordinates={[marker["Долгота"], marker["Широта"]]}
                  title={marker["Название"]}
                  color={"#0c307c"}
                />
              ))}
          </YMap>
        </YMapComponentsProvider>
      </div>
  );
};

export default Map;
