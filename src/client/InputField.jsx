import React from "react";

export function InputField({onChangeValue, value, label, type = "text"}) {
    return <div><label>{label}: <input type={type} value={value} onChange={e => onChangeValue(e.target.value)}/></label>
    </div>;
}