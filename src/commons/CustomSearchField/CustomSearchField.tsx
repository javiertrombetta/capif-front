import React, { FC } from "react";
import { Field } from "formik";

interface CustomSearchFieldProps {
  containerClassName?: string;
  defaultSelectedValue?: string;
  disabled?: boolean;
  fieldClassName?: string;
  id: string;
  labelText?: string;
  name: string;
  options?: { name: string; value: string }[];
  type: "text" | "password" | "email" | "date" | "number" | "select";
}

const CustomSearchField: FC<CustomSearchFieldProps> = ({
  containerClassName,
  defaultSelectedValue,
  disabled,
  fieldClassName,
  id,
  labelText,
  name,
  options,
  type,
}) => {
  return (
    <div className={`${containerClassName} w-[100%] flex flex-col`}>
      <label
        style={{ color: disabled ? "#a6acaf" : "black" }}
        className="font-bold"
      >
        {labelText ?? name}
      </label>
      <Field
        disabled={disabled}
        {...(type === "select" ? { as: "select" } : {})}
        id={id}
        name={name}
        className={`${fieldClassName} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]`}
      >
        {options && options.length > 0
          ? options.map((element, index) => (
              <option
                defaultValue={defaultSelectedValue ? defaultSelectedValue : ""}
                key={index}
                value={element.value}
              >
                {element.name}
              </option>
            ))
          : null}
      </Field>
    </div>
  );
};

export default CustomSearchField;
