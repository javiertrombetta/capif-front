import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface TimerInputProps {
  defaultTime?: { hours: number; minutes: number; seconds: number };
}

const TimerInput: React.FC<TimerInputProps> = ({ defaultTime }) => {
  const [time, setTime] = useState(
    defaultTime ? defaultTime : { hours: 0, minutes: 0, seconds: 0 }
  );

  const handleIncrement = (field: "hours" | "minutes" | "seconds") => {
    setTime((prev) => ({
      ...prev,
      [field]:
        prev[field] < (field === "hours" ? 23 : 59) ? prev[field] + 1 : 0,
    }));
  };

  const handleDecrement = (field: "hours" | "minutes" | "seconds") => {
    setTime((prev) => ({
      ...prev,
      [field]: prev[field] > 0 ? prev[field] - 1 : field === "hours" ? 99 : 59,
    }));
  };

  const handleInputChange = (
    field: "hours" | "minutes" | "seconds",
    value: string
  ) => {
    const numericValue = parseInt(value, 10);
    if (
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= (field === "hours" ? 23 : 59)
    ) {
      setTime((prev) => ({
        ...prev,
        [field]: numericValue,
      }));
    } else if (value === "") {
      setTime((prev) => ({ ...prev, [field]: 0 }));
    }
  };

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="w-[12rem] p-4 bg-white text-white rounded-md shadow-lg">
      <div className="flex items-center justify-center space-x-2">
        {["hours", "minutes", "seconds"].map((field, index) => (
          <div key={index} className="flex flex-col items-center gap-[0.5rem]">
            <p className="text-black">
              {field === "hours"
                ? "HH"
                : field === "minutes"
                  ? "MM"
                  : field === "seconds"
                    ? "SS"
                    : null}
            </p>
            <button
              type="button"
              className="text-xl font-bold hover:text-blue-500"
              onClick={() =>
                handleIncrement(field as "hours" | "minutes" | "seconds")
              }
            >
              <IoIosArrowUp size={15} color="black" />
            </button>
            <input
              type="number"
              value={formatTime(time[field as "hours" | "minutes" | "seconds"])}
              onChange={(e) =>
                handleInputChange(
                  field as "hours" | "minutes" | "seconds",
                  e.target.value
                )
              }
              className="w-12 h-12 text-center bg-[#d0d3d4] text-black rounded-md text-2xl appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              maxLength={2}
              max={field === "hours" ? 23 : 59}
              min={0}
            />
            <button
              type="button"
              className="text-xl font-bold hover:text-blue-500"
              onClick={() =>
                handleDecrement(field as "hours" | "minutes" | "seconds")
              }
            >
              <IoIosArrowDown size={15} color="black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerInput;
