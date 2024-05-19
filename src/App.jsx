import React from "react";
import FormCreatePoint from "./components/FormCreatePoint/formCreatePoint";
import Map from "./components/Map/Map";
import { useState } from "react";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import { Container } from "react-bootstrap";
import MessageWindow from "./components/MessageWindow/MessageWindow";

function App() {
  const location = { center: [61.4, 55.16], zoom: 9 };
  const apiKey = "47e9428b-e698-4791-98ce-87001909f7fb";
  const [points_list, set_list] = useState([]);
  const [page, setPage] = useState("Карта");

  return (
    <div>
      <span onClick={() => setPage("Карта")}>Карта</span>
      <span onClick={() => setPage("Новости")}>Новости</span>

      {page === "Карта" && (
        <div className="App bg-light-subtle">
          <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            <FormCreatePoint points_list={points_list} set_list={set_list} />
            <Map
              location={location}
              apiKey={apiKey}
              points_list={points_list}
            />
                <NotificationContainer/>
          </div>
        </div>
      )}
      {page === "Новости" && (
        <Container>
          <MessageWindow />
        </Container>
      )}
    </div>
  );
}

export default App;
