import React, { FC, ReactNode } from "react";

interface CustomLayoutProps {
  children?: ReactNode;
  className?: string;
}
const CustomLayout: FC<CustomLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomLayout;
