import React, { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
import "./Spinner.css";

interface SpinnerProps {
  color?: string;
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ color, size }) => {
  return (
    <div>
      <ImSpinner2
        size={size ? size : 60}
        className="spinner-icon"
        color={color ? color : "white"}
      />
    </div>
  );
};

export default Spinner;
