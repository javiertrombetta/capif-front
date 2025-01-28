import React, { FC } from "react";

interface CustomFileInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const CustomFileInput: FC<CustomFileInputProps> = ({
  onChange,
  children,
  className,
}) => {
  return (
    <button
      style={{ cursor: "pointer" }}
      className={`${className} relative overflow-hidden p-[0.4rem] text-white cursor-pointer flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]`}
    >
      {children}
      <input
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer w-[100%] h-[100%]"
        type="file"
      />
    </button>
  );
};

export default CustomFileInput;
