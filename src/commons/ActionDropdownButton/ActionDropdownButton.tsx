import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface ActionDropdownButtonProps {
  toggleDropdown: (id: number) => void;
  id: number;
  activeDropdown: number | null;
}

const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
  toggleDropdown,
  id,
  activeDropdown,
}) => {
  const router = useRouter();

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  return (
    <div className="px-6 py-4 relative group">
      <button
        onClick={() => toggleDropdown(id)}
        className="bg-[#1280e1] text-white w-[2rem] h-[2rem] flex justify-center items-center rounded-[0.3rem]"
      >
        <IoMdSettings size={20} />
      </button>
      <ul
        className={`absolute right-0 mt-2 w-[8rem] bg-slate-900 border rounded-md shadow-lg z-30 overflow-hidden ${
          activeDropdown === id ? "" : "hidden"
        }`}
      >
        <li
          onClick={() => redirectToOption("/edit-user")}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaEdit /> <p>Editar</p>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdownButton;
