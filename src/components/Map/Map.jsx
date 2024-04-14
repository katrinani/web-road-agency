import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
} from "ymap3-components";

const Map = (props) => {
  return (
    <div className="map w-50 h-100 px-2">
      <YMapComponentsProvider apiKey={props.apiKey}>
        <YMap location={props.location}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
        </YMap>
      </YMapComponentsProvider>
    </div>
  );
};

export default Map;
