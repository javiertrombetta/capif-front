import React, { FC, ReactNode } from "react";

interface CustomButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  width?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  background?: "warn" | "delete" | "disabled";
}

const CustomButton: FC<CustomButtonProps> = ({
  type,
  children,
  className,
  onClick,
  width,
  disabled,
  background,
}) => {
  const handleSetBackground = (): React.CSSProperties => {
    let backgroundColor = "";
    switch (background) {
      case "disabled":
        backgroundColor = "#979797";
        break;
      case "warn":
        backgroundColor = "#f39c12";
        break;
      case "delete":
        backgroundColor = "#e74c3c";
        break;
      default:
        backgroundColor = "#1280e1";
    }

    return { backgroundColor, color: "white" };
  };

  return (
    <button
      type={type ? type : "button"}
      disabled={disabled && background && background === "disabled"}
      onClick={onClick}
      style={handleSetBackground()}
      className={`${className} ${width ? width : "w-fit"} flex items-center justify-center h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
