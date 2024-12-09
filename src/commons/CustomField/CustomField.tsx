import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";
import "./CustomField.css";

interface CustomFieldProps {
  type: "text" | "password" | "email" | "date" | "number";
  id: string;
  name: string;
  fieldClassName?: string;
  labelText: string;
  containerClassName?: string;
  disabled?: boolean;
}

const CustomField: FC<CustomFieldProps> = ({
  type,
  fieldClassName,
  labelText,
  id,
  name,
  disabled,
}) => {
  return (
    <div className={" w-[100%] container flex flex-col"}>
      <label
        style={{ color: disabled ? "#a6acaf" : "black" }}
        className="font-bold"
      >
        {labelText}
      </label>

      <Field
        disabled={disabled}
        type={type}
        id={id}
        name={name}
        className={`${fieldClassName} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]`}
      />
      <div className="w-[100%] mt-[0.4rem] border-[2px] border-[red]">
        <ErrorMessage name={name} component="div" className="error-message " />
      </div>
    </div>
  );
};

export default CustomField;
