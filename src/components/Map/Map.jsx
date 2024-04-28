import React, { useState, useEffect } from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from "ymap3-components";

const Map = (props) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const testData = [
      { name: "Point 1", latitude: 55.755826, longitude: 37.617299 },
      { name: "Point 2", latitude: 55.755826, longitude: 37.627299 },
      { name: "Point 3", latitude: 55.745826, longitude: 37.617299 },
    ];

    const newMarkers = testData.map((point) => ({
      geometry: [point.longitude, point.latitude],
      properties: {
        balloonContent: point.name,
      },
    }));
    setMarkers(newMarkers);
  }, []);

// useEffect(() => {
  //   fetch("https://your-backend-url/points")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const newMarkers = data.map((point) => ({
  //           geometry: [point.longitude, point.latitude],
  //           properties: {
  //             balloonContent: point.name,
  //           },
  //         }));
  //         setMarkers(newMarkers);
  //       })
  //       .catch((error) => console.error("Error fetching points:", error));
  // }, []);

  return (
      <div className="map w-50 h-100 px-2">
        <YMapComponentsProvider apiKey={props.apiKey}>
          <YMap defaultState={{ center: props.location, zoom: 10 }}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {markers && markers.map((marker, index) => (
                <YMapDefaultMarker
                    key={index}
                    coordinates={marker.geometry}
                    properties={marker.properties}
                />
            ))}
          </YMap>
        </YMapComponentsProvider>
      </div>
  );
};

export default Map;







