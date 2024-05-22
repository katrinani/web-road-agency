import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomInput from "../CustomInput/custom_input";
import { FormData, highways, point_types } from "../../helpers/FormData.js";
import FormDefaultData from "../../helpers/FormDefaultData";
import CrudPoints from "../../helpers/CrudPoints.js";
import getAllPoints from "../../helpers/AllPoints";
import regions from "../../helpers/Regions.js";
import pointEditing from "../../helpers/PointEditing";

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
    const selectedValues = event.value;
    setInputValues((prevState) => ({
      ...prevState,
      Регион: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    props.setButtonName("Добавить");
    const form = {
      ...inputValues,
      Дорога: inputValues["Дорога"].value,
      "Тип точки": inputValues["Тип точки"].value,
    };

    if (isEditMode) {
        console.log('Редактируем....')
      await pointEditing(form)
    } else {
        console.log('Создаем....')
      await CrudPoints.createPoint(form);
    }

    const roadName = form.Дорога;
    const points = await getAllPoints(roadName);
    console.log(points);
    props.set_list(points);
    console.log(points);
    console.log("дефолт ", FormDefaultData);
    console.log("Dct nочки которые пришли", props.points_list);
    setInputValues(FormDefaultData);
    console.log(inputValues);
  };

  const renderRegionInput = () => {
    if (inputValues["Тип точки"] === "километр") {
      return (
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
      );
    }

    return null;
  };

  return (
      <form className="p-5  w-50 shadow-sm p-3 bg-body-tertiary rounded border border-dark-subtle d-flex flex-column mb-2 align-items-start">
        <h3>Добавить точку</h3>
        <div class="my-3 w-100">
          <div class="container-fluid w-100 p-0">
            <div class="row">
              <div class="col-12">
                <CustomInput
                    name={Object.keys(FormData)[0]}
                    value={inputValues[Object.keys(FormData)[0]]}
                    onChange={handleInputChange(Object.keys(FormData)[0])}
                />
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <CustomInput
                    name={Object.keys(FormData)[1]}
                    value={inputValues[Object.keys(FormData)[1]]}
                    onChange={handleInputChange(Object.keys(FormData)[1])}
                />
              </div>
              <div class="col-6">
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

          <div class="my-3">
            <span>Тип точки</span>
            <Select
                key={`type ${inputValues[Object.keys(FormData)[4]]}`}
                value={inputValues[Object.keys(FormData)[4]] || ""}
                options={point_types.map((value) => ({
                  value,
                  label: value,
                }))}
                onChange={handleSingleSelectChangeType}
            />
          </div>

          {renderRegionInput()}
        </div>
        <button
            type="button"
            onClick={handleSubmit}
            class="btn btn-primary align-self-end mt-3 "
        >
          {isEditMode ? "Сохранить" : props.button_name}
        </button>
      </form>
  );
};

export default FormCreatePoint;
