import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from "ymap3-components";
import React from "react";
import { useState } from "react";

const Map = (props) => {
  
  
  const handleMarkerClick = (marker) => {
    console.log("Координаты маркера: ", marker["Широта"], marker["Долгота"]);
    console.log("Название", marker["Название"]);
    props.setSelectedPoint(marker);
    props.setShowModal(true);
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
                  coordinates={[marker["Широта"], marker["Долгота"]]}
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
