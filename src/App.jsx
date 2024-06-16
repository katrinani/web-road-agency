import React, {useEffect, useState} from "react";
import FormCreatePoint from "./components/FormCreatePoint/formCreatePoint";
import Map from "./components/Map/Map";
import {Button, Container, Modal} from "react-bootstrap";
import pointDeleting from "./helpers/Request/PointDeleting";
import "react-notifications/lib/notifications.css";
import {NotificationContainer} from "react-notifications";
import "./App.css"
import MessageWindow from "./components/MessageWindow/MessageWindow";
import getAllPoints from "./helpers/Request/AllPoints";
import ListPoints from "./components/ListPoints/ListPoints";
import Filter from "./components/Map/Filter";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const apiKey = "47e9428b-e698-4791-98ce-87001909f7fb";
  const [location, setLocation] = useState({ center: [55.163742, 61.400346], zoom: 11 });
  const [points_list, set_list] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [buttonName, setButtonName] = useState("Добавить");
  const [formValues, setFormValues] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState("Карта");

  useEffect(() => {
    const fetchPoints = async () => {
      // const points = await getAllPoints("Р-354: Екатеринбург - Курган");
      const points = [
        {
          "Широта": 55.38229517732815,
          "Долгота": 61.3663445598471,
          "Название": "29",
          "ID": "00c527fe-3e6d-47b5-9b19-52a995b99be0",
          "Тип точки": [8],
          "Описание": "",
          "Дорога": "М-5 \"Урал\" ПкЕ: Челябинск - Екатеринбург",
          "Регион": "Челябинская область"
        },
        {
          "Широта": 55.39229519999999,
          "Долгота": 61.3963449999999,
          "Название": "30",
          "ID": "00c527fe-3e6d-47b5-9b19-52a995b99be0",
          "Тип точки": [5],
          "Описание": "",
          "Дорога": "М-5 \"Урал\" ПкЕ: Челябинск - Екатеринбург",
          "Регион": ""
        }
      ];
      set_list(points);
      if (points.length > 0) {
        const lastPoint = points[points.length - 1];
        console.log(lastPoint.Широта)
        console.log(lastPoint.Долгота)
        setLocation({ center: [lastPoint.Долгота, lastPoint.Широта], zoom: 9 });
      }
    };
    fetchPoints();
  }, []);

  const handleFormValues = (marker) => {
    console.log(marker);
    setFormValues(marker);
  };

  return (
    <div>
      <div class="nav">
        <span onClick={() => setPage("Карта")} className="">Карта</span>
        <span onClick={() => setPage("Новости")} className="">Новости</span>
      </div>
      {page === "Карта" && (
        <div className="App bg-light-subtle">
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedPoint && selectedPoint["Название"]
                  ? selectedPoint["Название"]
                  : "Точка"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-between">
              <Button
                variant="light"
                onClick={() => {
                  setIsActive(true);
                  setShowModal(false);
                  setButtonName("Сохранить");
                }}
              >
                Редактировать
              </Button>
              <Button
                variant="dark"
                onClick={async () => {
                  setShowModal(false);
                  console.log("Удаляем...");
                  console.log(selectedPoint);
                  await pointDeleting(selectedPoint);
                }}
              >
                Удалить
              </Button>
            </Modal.Body>
          </Modal>

          <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            <FormCreatePoint
              points_list={points_list}
              set_list={set_list}
              button_name={buttonName}
              setButtonName={setButtonName}
              formValues={formValues}
              isActive={isActive}
              setLocation={setLocation}
            />
            <Map
              location={location}
              apiKey={apiKey}
              points_list={points_list}
              setShowModal={setShowModal}
              setSelectedPoint={setSelectedPoint}
              setFormValues={handleFormValues}
            />
            <ListPoints
              points_list={points_list}
              setShowModal={setShowModal}
              setSelectedPoint={setSelectedPoint}
              setFormValues={handleFormValues}
            />
            <NotificationContainer />
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
