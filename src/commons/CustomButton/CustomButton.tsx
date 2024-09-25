import React, { FC, ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex items-center justify-center bg-mainblue w-fit h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem] text-white`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
