import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerInputProps {
  defaultTime?: string; // Ahora recibe la hora en formato "HH:MM:SS"
  onChange?: (formattedTime: string) => void;
}

// Función para convertir "HH:MM:SS" en un objeto TimeState
const parseTime = (timeString: string): TimeState => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return {
    hours: isNaN(hours) ? 0 : hours,
    minutes: isNaN(minutes) ? 0 : minutes,
    seconds: isNaN(seconds) ? 0 : seconds,
  };
};

// Función para formatear TimeState a "HH:MM:SS"
const formatTime = (time: TimeState): string => {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
};

const TimerInput: React.FC<TimerInputProps> = ({
  defaultTime = "00:00:00",
  onChange,
}) => {
  const [time, setTime] = useState<TimeState>(parseTime(defaultTime));

  const updateTime = (newTime: TimeState) => {
    setTime(newTime);
    onChange?.(formatTime(newTime));
  };

  const handleIncrement = (field: keyof TimeState) => {
    const newValue =
      time[field] < (field === "hours" ? 23 : 59) ? time[field] + 1 : 0;
    updateTime({ ...time, [field]: newValue });
  };

  const handleDecrement = (field: keyof TimeState) => {
    const newValue =
      time[field] > 0 ? time[field] - 1 : field === "hours" ? 23 : 59;
    updateTime({ ...time, [field]: newValue });
  };

  const handleInputChange = (field: keyof TimeState, value: string) => {
    const numericValue = parseInt(value, 10);
    if (
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= (field === "hours" ? 23 : 59)
    ) {
      updateTime({ ...time, [field]: numericValue });
    } else if (value === "") {
      updateTime({ ...time, [field]: 0 });
    }
  };

  return (
    <div className="w-[12rem] p-4 bg-white text-white rounded-md shadow-lg">
      <div className="flex items-center justify-center space-x-2">
        {(["hours", "minutes", "seconds"] as (keyof TimeState)[]).map(
          (field, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-[0.5rem]"
            >
              <p className="text-black">
                {field === "hours" ? "HH" : field === "minutes" ? "MM" : "SS"}
              </p>
              <button
                type="button"
                className="text-xl font-bold hover:text-blue-500"
                onClick={() => handleIncrement(field)}
              >
                <IoIosArrowUp size={15} color="black" />
              </button>
              <input
                type="number"
                value={time[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-12 h-12 text-center bg-[#d0d3d4] text-black rounded-md text-2xl appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                className="text-xl font-bold hover:text-blue-500"
                onClick={() => handleDecrement(field)}
              >
                <IoIosArrowDown size={15} color="black" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TimerInput;
