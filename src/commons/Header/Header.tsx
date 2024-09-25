import React, { FC } from "react";

interface HeaderProps {
  title: string;
  hr?: boolean;
  className?: string;
}

const Header: FC<HeaderProps> = ({ className, title, hr = true }) => {
  return (
    <div
      className={`${hr ? "border-b-[#4444] border-[2px]" : ""} pb-[1rem] ${className}`}
    >
      <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
        {title}
      </h1>
    </div>
  );
};

export default Header;
