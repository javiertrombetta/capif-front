import React, { FC, ReactNode } from "react";

interface CustomButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  width?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  type,
  children,
  className,
  onClick,
  width,
  disabled,
}) => {
  const handleSetBackground = (): React.CSSProperties => {
    if (disabled) {
      return {
        backgroundColor: "#979797",
        color: "white",
      };
    }
    return {
      backgroundColor: "#1280e1",
      color: "white",
    };
  };

  return (
    <button
      type={type ? type : "button"}
      disabled={disabled}
      onClick={onClick}
      style={handleSetBackground()}
      className={`${className} ${width ? width : "w-fit"} flex items-center justify-center h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
