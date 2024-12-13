import React, {useEffect, useState} from "react";
import FormCreatePoint from "./components/CreatePoints/FormCreatePoint/formCreatePoint";
import Map from "./components/CreatePoints/Map/Map";
import {Button, Container, Modal} from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import {NotificationContainer} from "react-notifications";
import "./App.css"
import MessageWindow from "./components/MessageWindow/MessageWindow";
import getAllPoints from "./helpers/Request/AllPoints";
import ListPoints from "./components/CreatePoints/ListPoints/ListPoints";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Analysis from "./components/Analysis/Analysis";
import CrudPoints from "./helpers/Request/CrudPoints";


function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  // const apiKey = 'f76e8033-445d-48b9-8805-b6987c78678d';
  const [location, setLocation] = useState({ center: [61.400346, 55.163742], zoom: 11 });
  const [points_list, set_list] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [buttonName, setButtonName] = useState("Добавить");
  const [formValues, setFormValues] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState("Анализ");
  const [rightPart, setRightPart] = useState("Создаем");
  const [refresh, setRefresh]  = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const points = await getAllPoints();
      set_list(points);
    };
    fetchPoints();
    setRefresh(false);
  }, [refresh]);

  const handleFormValues = (marker) => {
    console.log(marker);
    setFormValues(marker);
  };

  return (
    <div>
      <div className="nav">
        <span onClick={() => setPage("Карта")} className="">Верифицированные точки</span>
        <span onClick={() => setPage("Новости")} className="">Новости</span>
        <span onClick={() => setPage("Анализ")} className="">Анализ дорог</span>
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
                  const response = await CrudPoints.pointDeleting(selectedPoint);
                  if (response === 200) {
                    setRefresh(true);
                  }
                }}
              >
                Удалить
              </Button>
            </Modal.Body>
          </Modal>

          <div className="position-absolute translate-middle top-50 start-50 w-75 h-75 d-flex flex-row">
            {rightPart === "Создаем" && (
                <FormCreatePoint
                    points_list={points_list}
                    set_list={set_list}
                    button_name={buttonName}
                    setButtonName={setButtonName}
                    formValues={formValues}
                    isActive={isActive}
                    setLocation={setLocation}
                    setRefresh={setRefresh}
                />
            )}
            {rightPart === "Изучаем" && (
                <ListPoints
                    points_list={points_list}
                    setShowModal={setShowModal}
                    setSelectedPoint={setSelectedPoint}
                    setFormValues={handleFormValues}
                    setRightPart={setRightPart}
                />
            )}
            <Map
              location={location}
              apiKey={apiKey}
              points_list={points_list}
              setShowModal={setShowModal}
              setSelectedPoint={setSelectedPoint}
              setFormValues={handleFormValues}
              setRightPart={setRightPart}
            />
            <NotificationContainer />
          </div>
        </div>
      )}

      {page === "Новости" && (
        <Container>
          <MessageWindow />
          <NotificationContainer />
        </Container>
      )}

      {page === "Анализ" && (
          <div>
            <Analysis apiKey={apiKey}/>
            <NotificationContainer />
          </div>
      )}
    </div>
  );
}

export default App;
