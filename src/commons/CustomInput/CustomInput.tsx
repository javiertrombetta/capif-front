import React, { FC } from "react";
import "./CustomInput.css";

interface CustomInputProps {
  type: "text" | "password" | "email" | "date" | "number" | "file";
  className?: string;
  label?: string;
  containerClassName?: string;
  placeholder?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  type,
  className,
  label,
  containerClassName,
  placeholder,
}) => {
  return (
    <>
      {label ? (
        <div className={`${containerClassName}`}>
          <p className="font-bold text-black">{label}</p>
          <input
            placeholder={placeholder}
            type={type}
            className={`${className} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black`}
          />
        </div>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          className={`${className} padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black`}
        />
      )}
    </>
  );
};

export default CustomInput;
