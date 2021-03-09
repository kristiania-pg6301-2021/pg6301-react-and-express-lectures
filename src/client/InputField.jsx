import React from "react";

export function InputField({ value, label, onChangeValue, type = "text" }) {
  return (
    <div>
      <label>
        {label}:
        <input
          type={type}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </label>
    </div>
  );
}
