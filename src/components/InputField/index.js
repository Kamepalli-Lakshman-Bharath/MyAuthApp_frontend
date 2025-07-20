import React from "react";

const InputField = (props) => {
  const { error = false, errorMessage = "", ...inputProps } = props;
  const { readOnly, name } = props;
  return (
    <div className="gap-[2px]">
      <label className="flex gap-[1px] flex-col">
        <p
          className={`font-medium  w-fit ${
            readOnly ? "" : "after:content-['*']"
          } after:text-red-500`}
        >
          {name}
        </p>
        <input
          className="focus:outline-0 focus-within:border-[#FF8541] border-gray-400 border rounded-md px-2 py-1"
          type="text"
          required
          {...inputProps}
        />
      </label>
      {
        <p
          className={`${
            error ? "visible" : "invisible"
          } text-[12px] text-red-600 font-semibold`}
        >
          {errorMessage || "Error Message"}
        </p>
      }
    </div>
  );
};

export default InputField;
