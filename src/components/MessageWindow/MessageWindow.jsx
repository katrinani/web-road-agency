import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
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
    location: null
  });
  const [local_roads, setRoads] = useState([]);
  const [local_regions, setRegions] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

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
    const a = document.getElementById('datetime').value; // Assuming the DateTimePicker has an id

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
      console.log(newMessage)
      sendAdvert(newMessage)
    }
  };

  return (
    <div className="container mt-5">
      <ListGroup className="mt-3">
        {messages.map((message) => (
          <ListGroup.Item key={message.id}>
            <strong>{message.timestamp}</strong>: {message.title} -{" "}
            {message.description} ({message.locationType}, {message.location},{" "}
            {message.expireTime.toLocaleString()})
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h2>Отправить новость</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titleInput">
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Название"
          />
        </Form.Group>
        <Form.Group controlId="descriptionTextarea">
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
            options={local_roads.map((road) => ({
              value: road,
              label: road,
            }))}
            value={formData.location}
            onChange={handleInputChange("location")}
            placeholder="Выберите дорогу"
          />
        )}
        <DateTimePicker
          id="datetime"
          onChange={handleDateTimeChange}
          value={selectedDateTime}
        />
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default MessageWindow;
