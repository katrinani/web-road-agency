import React, { useState, useEffect  } from 'react';
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker
} from "ymap3-components";
import api from './api';

const handleRequest = async (roadName, map) => {
  try {
    const pointsData = await api.getVerifiedPoints(roadName);
    pointsData.points.forEach((point) => {
      const marker = (
          <YMapDefaultMarker
              key={point.id}
              coordinates={[point.coordinates.latitude, point.coordinates.longitude]}
              content={`<div style="background-color: #3388ff; color: white; padding: 5px 10px; border-radius: 5px;">${point.name}</div>`}
          />
      );
      map.addChild(marker);
    });
  } catch (error) {
    console.error('Error adding markers:', error);
  }
};

const Map = (props) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      handleRequest('М-5', map).catch((error) => {
        console.error('Error in handleRequest:', error);
      });
    }
  }, [map]);

  return (
      <div className="map w-50 h-100 px-2">
        <YMapComponentsProvider apiKey={props.apiKey}>
          <YMap location={props.location} onMapInit={(mapInstance) => setMap(mapInstance)}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
          </YMap>
        </YMapComponentsProvider>
      </div>
  );
};

export default Map;

