import React, { FC } from "react";
import "./CustomInput.css";

interface CustomInputProps {
  type: "text" | "password" | "email" | "date";
  clasName?: string;
}

const CustomInput: FC<CustomInputProps> = ({ type, clasName }) => {
  return (
    <input
      type={type}
      className={`padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black ${clasName}`}
    />
  );
};

export default CustomInput;
