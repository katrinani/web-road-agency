import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomInput from "../CustomInput/custom_input";
import { FormData, highways, point_types } from "../../helpers/FormData.js";
import FormDefaultData from "../../helpers/FormDefaultData";
import CrudPoints from "../../helpers/Request/CrudPoints.js";
import getAllPoints from "../../helpers/Request/AllPoints";
import regions from "../../helpers/Request/Regions.js";
import pointEditing from "../../helpers/Request/PointEditing";
import Form from "react-bootstrap/Form";

const FormCreatePoint = (props) => {
  const [inputValues, setInputValues] = useState(FormDefaultData);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (props.isActive && props.formValues) {
      setInputValues(props.formValues);
      setIsEditMode(true);
    }
  }, [props.isActive, props.formValues]);

  const handleInputChange = (name) => (event) => {
    const { value } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingleSelectChange = (event) => {
    setInputValues((prevState) => ({
      ...prevState,
      [Object.keys(FormData)[3]]: event,
    }));
  };

  const handleSingleSelectChangeType = (event) => {
    setInputValues((prevState) => ({
      ...prevState,
      [Object.keys(FormData)[4]]: event,
    }));
  };

  const handleSingleSelectChangeRegion = (event) => {
    setInputValues((prevState) => ({
      ...prevState,
      [Object.keys(FormData)[5]]: event,
    }));
  };

  const handleSubmit = async (e) => {
    props.setButtonName("Добавить");
    const form = {
      ...inputValues,
      Дорога: inputValues["Дорога"].value,
      "Тип точки": inputValues["Тип точки"].value,
    };

    // установка локации на новой точке
    console.log({ center: [inputValues.Долгота, inputValues.Широта ], zoom: 9 })
    props.setLocation({ center: [inputValues.Долгота, inputValues.Широта ], zoom: 9 });

    if (isEditMode) {
      console.log("Редактируем....");
      await pointEditing(form);
    } else {
      console.log("Создаем....");
      await CrudPoints.createPoint(form);
    }

    const points = await getAllPoints(props.location);
    console.log(points);
    props.set_list(points);
    console.log(points);
    console.log("дефолт ", FormDefaultData);
    console.log(props.points_list);
    setInputValues(FormDefaultData);
    console.log("inputValues", inputValues);
  };

  return (
    <form className="p-5  w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-start">
      <h3>Добавить точку</h3>
      <div className="my-3 w-100">
        <div className="container-fluid w-100 p-0">
          <div className="row">
            <div className="col-12">
              <CustomInput
                name={Object.keys(FormData)[0]}
                value={inputValues[Object.keys(FormData)[0]]}
                onChange={handleInputChange(Object.keys(FormData)[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <CustomInput
                name={Object.keys(FormData)[1]}
                value={inputValues[Object.keys(FormData)[1]]}
                onChange={handleInputChange(Object.keys(FormData)[1])}
              />
            </div>
            <div className="col-6">
              <CustomInput
                name={Object.keys(FormData)[2]}
                value={inputValues[Object.keys(FormData)[2]]}
                onChange={handleInputChange(Object.keys(FormData)[2])}
              />
            </div>
          </div>
        </div>
        <div>
          <span>Название дороги</span>
          <Select
            key={`road ${inputValues[Object.keys(FormData)[3]]}`}
            value={inputValues[Object.keys(FormData)[3]] || ""}
            options={highways.map((value) => ({
              value,
              label: value,
            }))}
            onChange={handleSingleSelectChange}
          />
        </div>

        <div className="my-3">
          <span>Тип точки</span>
          <Select
            key={`type ${inputValues[Object.keys(FormData)[4]]}`}
            value={inputValues[Object.keys(FormData)[4]] || ""}
            options={point_types.map((value) => ({
              value,
              label: value
            }))}
            onChange={handleSingleSelectChangeType}
          />
        </div>
        {inputValues["Тип точки"]["value"] === "Километр" && (
          <div className="my-3">
            <span>Регион</span>
            <Select
              options={regions.map((value) => ({
                value,
                label: value,
              }))}
              onChange={handleSingleSelectChangeRegion}
            />
          </div>
        )}

        {inputValues["Тип точки"]["value"] === "Событие" && (
          <div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={inputValues[Object.keys(FormData)[6]]}
                onChange={handleInputChange(Object.keys(FormData)[6])}
              />
            </Form.Group>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-primary align-self-end mt-3 "
      >
        {isEditMode ? "Сохранить" : props.button_name}
      </button>
    </form>
  );
};

export default FormCreatePoint;
