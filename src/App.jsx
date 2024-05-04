import React from "react";
import FormCreatePoint from "./components/FormCreatePoint/formCreatePoint";
import Map from "./components/Map/Map";

function App() {
  const location = { center: [61.333478, 55.179505], zoom: 13 };
  const apiKey = "f76e8033-445d-48b9-8805-b6987c78678d";
  return (
    <div className="App bg-light-subtle">
      <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
        <FormCreatePoint />
        <Map location={location} apiKey={apiKey} />
      </div>
    </div>
  );
}

export default App;
