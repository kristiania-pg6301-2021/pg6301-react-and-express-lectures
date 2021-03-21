import React from "react";

export function InputField({ label, value, onValueChange, type = "text" }) {
  return (
    <div>
      <label>
        {label}{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </label>
    </div>
  );
}