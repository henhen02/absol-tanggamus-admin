import React from "react";

export const InputColumn = ({
  label,
  type,
  placeholder,
  action,
  inputname,
}) => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <label htmlFor={inputname} className="text-gray-700 font-medium">
          {label}
        </label>
        <input
          className="border-2 border-gray-300 p-2 rounded-md"
          name={inputname}
          type={type}
          placeholder={placeholder}
          onChange={action}
        />
      </div>
    </>
  );
};

export const InputRow = ({ label, type, placeholder, action, inputname }) => {
  return (
    <>
      <div className="flex flex-row">
        <label htmlFor={inputname} className="text-gray-700">
          {label}
        </label>
        <input
          className="border-2 border-gray-300 p-2 rounded-md"
          name={inputname}
          type={type}
          placeholder={placeholder}
          onChange={action}
        />
      </div>
    </>
  );
};
