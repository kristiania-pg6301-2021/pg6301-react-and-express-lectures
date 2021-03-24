import React from "react";

export function InputField({ value, onValueChange, type = "text", label }) {
  return (
    <div>
      <label>
        {label}:{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </label>
    </div>
  );
}