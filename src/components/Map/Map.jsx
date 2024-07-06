import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapMarker
} from "ymap3-components";
import {iconsVerified} from "../../helpers/IconsPath";
import React, {useEffect, useState} from "react";
import Filter from "./Filter";

const Map = (props) => {
    console.log(props.points_list)
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

  return (
      <div className="map w-50 h-100 px-2 position-relative">
          <div className="position-absolute top-0 start-0 p-3" style={{zIndex: 1}}>
              <Filter
                  points_list={props.points_list}
                  filteredPoints={filteredPoints}
                  setFilteredPoints={setFilteredPoints}
              />
          </div>
          <YMapComponentsProvider apiKey={props.apiKey}>
              <YMap location={props.location}>
                  <YMapDefaultSchemeLayer/>
                  <YMapDefaultFeaturesLayer/>
                  {filteredPoints &&
                      filteredPoints.map((marker, index) => (
                          <YMapMarker
                              coordinates={[marker["Долгота"], marker["Широта"]]}
                              key={index}
                              onClick={() => handleMarkerClick(marker)}
                          >
                              <div style={{display: 'flex', alignItems: 'center'}}>
                                  <img
                                      src={iconsVerified[marker["Тип точки"][0]]}
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
