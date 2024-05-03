import React, { useState } from "react";
import Select from "react-select";
import CustomInput from "../CustomInput/custom_input";
import FormData from "../../helpers/FormData";
import FormDefaultData from "../../helpers/FormDefaultData";
import CrudPoints from "../../helpers/CrudPoints.js";


const FormCreatePoint = (props) => {
  const [inputValues, setInputValues] = useState(FormDefaultData);

  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    console.log(value);
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingleSelectChange = (event) => {
    const selectedValues = event.value;
    setInputValues((prevState) => ({
      ...prevState,
      Дорога: selectedValues,
    }));
  };

  const handleMultipleSelectChange = (event) => {
    const selectedValues = event.map((option) => option.value);
    setInputValues((prevState) => ({
      ...prevState,
      "Тип точки": selectedValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log(inputValues);
    const points_list = props.points_list;
    const set_list = props.set_list;
    console.log(points_list)
    console.log(set_list)
    if (points_list)
      set_list(points_list => [...points_list, inputValues]);
    else 
      set_list([inputValues])
    // props.points_list.map((marker, index) => console.log(marker["coordinates"].toString() + ' ' + index))
    //CrudPoints.createPoint(inputValues)
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
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: Object.keys(FormData)[0],
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <CustomInput
                name={Object.keys(FormData)[1]}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: Object.keys(FormData)[1],
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div class="col-6">
              <CustomInput
                name={Object.keys(FormData)[2]}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: Object.keys(FormData)[2],
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <span>Название дороги</span>
          <Select
            options={FormData["Дорога"].map((value) => ({
              value,
              label: value,
            }))}
            onChange={handleSingleSelectChange}
          />
        </div>

        <div class="my-3">
          <span>Тип точки</span>
          <Select
            options={FormData["Тип точки"].map((value) => ({
              value,
              label: value,
            }))}
            isMulti
            onChange={handleMultipleSelectChange}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        class="btn btn-primary align-self-end mt-3 "
      >
        Добавить
      </button>
    </form>
  );
};


export default FormCreatePoint;