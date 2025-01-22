import React, { FC, ReactNode } from "react";

interface CustomLayoutProps {
  children?: ReactNode;
  className?: string;
}
const CustomLayout: FC<CustomLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`h-[100vh] max-w-[100%] min-w-[100%] bg-[white] pb-[4rem] overflow-y-auto flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomLayout;
