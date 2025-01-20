import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";
import "./CustomField.css";

interface CustomFieldProps {
  type: "text" | "password" | "email" | "date" | "number" | "select";
  id: string;
  name: string;
  fieldClassName?: string;
  labelText: string;
  width?: string;
  disabled?: boolean;
  options?: { name: string; value: string }[];
  defaultSelectedValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomField: FC<CustomFieldProps> = ({
  type,
  fieldClassName,
  labelText,
  id,
  name,
  disabled,
  width = "w-[100%]",
  options,
  defaultSelectedValue,
  onChange,
}) => {
  return (
    <div className={`${width} container flex flex-col`}>
      <label
        style={{ color: disabled ? "#a6acaf" : "black" }}
        className="font-bold"
      >
        {labelText}
      </label>
      {type === "select" ? (
        <>
          <Field
            onChange={onChange}
            disabled={disabled}
            as={type}
            id={id}
            name={name}
            className={`${fieldClassName} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]`}
          >
            {options && options.length > 0
              ? options.map((element, index) => (
                  <option
                    defaultValue={
                      defaultSelectedValue ? defaultSelectedValue : ""
                    }
                    key={index}
                    value={element.value}
                  >
                    {element.name}
                  </option>
                ))
              : null}
          </Field>
          <div className="w-[100%] mt-[0.4rem]">
            <ErrorMessage
              name={name}
              component="div"
              className="error-message"
            />
          </div>
        </>
      ) : (
        <>
          <Field
            disabled={disabled}
            type={type}
            id={id}
            name={name}
            className={`${fieldClassName} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]`}
          />
          <div className="w-[100%] mt-[0.4rem]">
            <ErrorMessage
              name={name}
              component="div"
              className="error-message "
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomField;
