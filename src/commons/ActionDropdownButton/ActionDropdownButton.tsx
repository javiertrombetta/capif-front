import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { IoMdSettings } from "react-icons/io";

interface ActionDropdownButtonProps {
  menuOptions: { label: string; icon?: ReactElement; onClick: () => void }[];
}

export const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
  menuOptions,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setActiveDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const [activeDropdown, setActiveDropdown] = useState(false);
  const toggleDropdown = () => setActiveDropdown(!activeDropdown);

  return (
    <div ref={ref} className="px-6 py-4 relative group">
      <button
        onClick={() => toggleDropdown()}
        className="bg-[#1280e1] text-white w-[2rem] h-[2rem] flex justify-center items-center rounded-[0.3rem]"
      >
        <IoMdSettings size={20} />
      </button>
      <ul
        className={`absolute right-0 mt-2 w-max bg-slate-900 border rounded-md shadow-lg z-30 overflow-hidden ${
          activeDropdown ? "" : "hidden"
        }`}
      >
        {menuOptions.map((option, index) => (
          <li
            key={index}
            onClick={option.onClick}
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
          >
            {option.icon} <p>{option.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
