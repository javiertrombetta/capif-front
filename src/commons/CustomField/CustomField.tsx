import React, { FC, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./CustomField.css";

interface CustomFieldProps {
  type: "text" | "password" | "email" | "date" | "number" | "select";
  id: string;
  name: string;
  fieldClassName?: string;
  labelText?: string;
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
  const renderField = (): JSX.Element | null => {
    switch (type) {
      case "text":
      case "email":
      case "date":
      case "number":
        return (
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
        );

      case "password":
        return (
          <PasswordField
            disabled={disabled}
            id={id}
            name={name}
            fieldClassName={fieldClassName}
          />
        );

      case "select":
        return (
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
        );
    }
  };

  return (
    <div className={`${width} container flex flex-col`}>
      <label
        style={{ color: disabled ? "#a6acaf" : "black" }}
        className="font-bold"
      >
        {labelText}
      </label>
      {renderField()}
    </div>
  );
};

export default CustomField;

const PasswordField: FC<{
  disabled?: boolean;
  id: string;
  fieldClassName?: string;
  name: string;
}> = ({ disabled, id, fieldClassName, name }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className={`${fieldClassName} relative flex items-center`}>
        <Field
          disabled={disabled}
          type={!showPassword ? "password" : "text"}
          id={id}
          name={name}
          className={`${fieldClassName} w-[100%] padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]`}
        />
        {!showPassword ? (
          <FaEye
            onClick={() => setShowPassword((prevState: boolean) => !prevState)}
            color="#c8c8c8"
            className="absolute right-[0.6rem] cursor-pointer"
            size={20}
          />
        ) : (
          <FaEyeSlash
            onClick={() => setShowPassword((prevState: boolean) => !prevState)}
            color="#1280e1"
            className="absolute right-[0.6rem] cursor-pointer"
            size={20}
          />
        )}
      </div>

      <div className="w-[100%] mt-[0.4rem]">
        <ErrorMessage name={name} component="div" className="error-message " />
      </div>
    </>
  );
};
