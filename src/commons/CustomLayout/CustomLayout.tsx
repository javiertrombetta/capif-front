import React, { FC, ReactNode } from "react";

interface CustomLayoutProps {
  children?: ReactNode;
  className?: string;
}
const CustomLayout: FC<CustomLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-[100%] min-w-[100%] h-[100%] bg-[white] overflow-y-auto flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomLayout;
