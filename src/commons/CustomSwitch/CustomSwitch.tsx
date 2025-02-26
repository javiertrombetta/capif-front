import React, { FC, useState } from "react";
import "./CustomSwitch.css";

interface CustomSwitchProps {
  label: string;
  checked: boolean;
  handleOnCheck: (isChecked: boolean) => Promise<boolean>;
}

const CustomSwitch: FC<CustomSwitchProps> = ({
  checked,
  handleOnCheck,
  label,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onChange = async () => {
    const changed = await handleOnCheck(isChecked);
    if (changed) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <div className="w-[100%] flex flex-row items-center text-black ">
      <p className="text-xl font-black mr-[1rem]">{label}</p>
      <label className="relative inline-block w-[60px] h-[34px]">
        <input
          checked={isChecked}
          onChange={onChange}
          type="checkbox"
          className="opacity-0 w-0 h-0"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default CustomSwitch;
