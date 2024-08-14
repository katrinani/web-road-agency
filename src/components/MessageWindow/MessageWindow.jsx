import React, { useState, useEffect } from "react";
import {Form, Button, ListGroup, Modal} from "react-bootstrap";
import Select from "react-select";
import roads from "../../helpers/Request/Roads";
import regions from "../../helpers/Request/Regions";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import sendAdvert from "../../helpers/Request/Ads";

const MessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locationType: null,
    location: null,
  });
  const [local_roads, setRoads] = useState([]);
  const [local_regions, setRegions] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [buttonName, setButtonName] = useState("Отправить");

  const handleDateTimeChange = (date) => {
    console.log(date);
    setSelectedDateTime(date);
    console.log(selectedDateTime);
  };

  useEffect(() => {
    setRoads(roads);
    setRegions(regions);
    console.log(roads);
    console.log(regions);
  }, []);

  const handleInputChange = (inputName) => (selectedOption) => {
    if (inputName === "locationType") {
      setFormData({
        ...formData,
        locationType: selectedOption,
        location: null,
      });
    } else {
      setFormData({
        ...formData,
        [inputName]: selectedOption,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const a = document.getElementById("datetime").value;

    console.log(a);
    console.log(selectedDateTime);
    console.log(formData);

    if (
      formData.title !== "" &&
      formData.locationType &&
      formData.location &&
      selectedDateTime
    ) {
      const newMessage = {
        id: new Date(),
        title: formData.title,
        description: formData.description,
        locationType: formData.locationType.label,
        location: formData.location.label,
        expireTime: selectedDateTime,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setFormData({
        title: "",
        description: "",
        locationType: null,
        location: null,
      });
      setSelectedDateTime(new Date());
      console.log(newMessage);
      if (buttonName === "Отправить") {
        sendAdvert(newMessage);
      } else if (buttonName === "Сохранить") {
        //   запрос на редактирование
      }
    }
  };

  const handleClickMessage = (message) => {
    setSelectedMessage(message);
  };



  return (
    <div className="container mt-5">
      {/*Всплывашка с действием*/}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMessage.title !== "" && selectedMessage.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-between">
          <Button
              variant="light"
              onClick={() => {
                setShowModal(false);
                setButtonName("Сохранить");
                setFormData({
                    title: selectedMessage.title,
                    description: selectedMessage.description,
                    locationType: selectedMessage.locationType,
                    location: selectedMessage.location
                })
              }}
          >
            Редактировать
          </Button>
          <Button
              variant="dark"
              onClick={async () => {
                setShowModal(false);
                //  запрос на удаление
              }}
          >
            Удалить
          </Button>
        </Modal.Body>
      </Modal>

      <ListGroup className="mt-3">
        {messages && messages.map((message) => (
          <ListGroup.Item key={message.id} onClick={() => handleClickMessage(message)}>
            {message.timestamp} <br />
            <br />
            <strong>{message.title}</strong>
            <br />
            {message.description} <br />#{message.location}
            <br />
            <br />
            Новость существует до: {message.expireTime.toLocaleString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />
      <br />
      <h2>{buttonName === "Отправить" && "Создать новость" || "Редактирование новости"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titleInput" className="mb-3">
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Название"
          />
        </Form.Group>
        <Form.Group controlId="descriptionTextarea" className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Описание"
          />
        </Form.Group>
        <Select
          className="mb-3"
          options={[
            { value: "region", label: "Регион" },
            { value: "road", label: "Дорога" },
          ]}
          value={formData.locationType}
          onChange={handleInputChange("locationType")}
          placeholder="Выберите способ определения локации"
        />
        {formData.locationType && formData.locationType.value === "region" && (
          <Select
            className="mb-3"
            options={local_regions.map((region) => ({
              value: region,
              label: region,
            }))}
            value={formData.location}
            onChange={handleInputChange("location")}
            placeholder="Выберите регион"
          />
        )}
        {formData.locationType && formData.locationType.value === "road" && (
          <Select
            className="mb-3"
            options={local_roads.map((road) => ({
              value: road,
              label: road,
            }))}
            value={formData.location}
            onChange={handleInputChange("location")}
            placeholder="Выберите дорогу"
          />
        )}
        {/*TODO Сделать более приятный выбор даты*/}
        <DateTimePicker
          className="mb-3"
          id="datetime"
          onChange={handleDateTimeChange}
          value={selectedDateTime}
        />
        <Button variant="primary" type="submit" className="mx-3">
          {buttonName}
        </Button>
      </Form>
    </div>
  );
};

export default MessageWindow;
