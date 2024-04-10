import React from "react";

const CustomInput = (props) => {
    return (
        <div className="mb-3 w-auto">
            <label for={props.name} class="form-label">{props.name}</label>
            <input type="text" id={props.name} className="input-group-text w-100" onChange={props.onChange}/>
        </div>
    )
}

export default CustomInput