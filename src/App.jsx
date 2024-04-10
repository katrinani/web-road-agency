import React, { useState } from "react";
import FormCreatePoint from "./components/FormCreatePoint/formCreatePoint";

function App() {

  
  return (
    <div className="App bg-light-subtle">
      <FormCreatePoint/>
      <div id="map" class="w-50 h-30 bg-primary"></div>
    </div>
  );
}

export default App;
