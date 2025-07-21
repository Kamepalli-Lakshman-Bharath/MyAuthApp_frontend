import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = (props) => {
  const { error = false, errorMessage = "", type = "", ...inputProps } = props;
  const { readOnly, name } = props;

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="gap-[2px] relative">
      <label className="flex gap-[1px] flex-col">
        <p
          className={`font-medium w-fit ${
            readOnly ? "" : "after:content-['*']"
          } after:text-red-500`}
        >
          {name}
        </p>
        <div className="relative">
          <input
            className={`w-full pr-8 focus:outline-0 ${
              readOnly ? "bg-black/10" : "focus-within:border-[#FF8541]"
            } border-gray-400 border rounded-md px-2 py-1`}
            type={inputType}
            required
            readOnly={readOnly}
            {...inputProps}
          />
          {isPasswordField && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-xl cursor-pointer text-gray-600"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          )}
        </div>
      </label>
      {!readOnly && (
        <p
          className={`${
            error ? "visible" : "invisible"
          } text-[12px] text-red-600 font-semibold`}
        >
          {errorMessage || "Error Message"}
        </p>
      )}
    </div>
  );
};

export default InputField;
