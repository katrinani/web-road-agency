import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from "ymap3-components";
import React from "react";

const Map = (props) => {
  // const points_list = [{
  //   coordinates: [61.40, 55.16],
  //   popup: {
  //     content: "АЗС",
  //     position: "top"
  //   },
  // }];

  return (
    <div className="map w-50 h-100 px-2">
      <YMapComponentsProvider apiKey={props.apiKey}>
        <YMap location={props.location}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          {props.points_list &&
            props.points_list.map((marker, index) => (
              <YMapDefaultMarker
                key={index}
                coordinates={[marker["Широта"], marker["Долгота"]]}
              />
            ))}
        </YMap>
      </YMapComponentsProvider>
    </div>
  );
};

export default Map;
