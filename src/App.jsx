import React from "react";
import FormCreatePoint from "./components/FormCreatePoint/formCreatePoint";
import Map from "./components/Map/Map";

function App() {
  const location = { center: [37.95, 55.65], zoom: 10 };
  const apiKey = "47e9428b-e698-4791-98ce-87001909f7fb";
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
