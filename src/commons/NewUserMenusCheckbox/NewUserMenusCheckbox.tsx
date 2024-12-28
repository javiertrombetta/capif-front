import React, { FC, useEffect, useState } from "react";

type MenuOption = {
  name: string;
  id: string;
};

interface MenuProps {
  menuName: string;
  subMenuOptions: MenuOption[];
}

const NewUserMenusCheckbox: FC<MenuProps> = ({ menuName, subMenuOptions }) => {
  // Crear el estado inicial dinámicamente con base en las opciones
  const initialState = subMenuOptions.reduce(
    (acc, option) => {
      acc[option.id] = false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const [mainMenuState, setMainMenuState] = useState(false);
  const [menuState, setMenuState] =
    useState<Record<string, boolean>>(initialState);

  // Maneja el check/uncheck del menú principal
  const handleSetFullMenu = () => {
    const newState = Object.fromEntries(
      Object.keys(menuState).map((key) => [key, !mainMenuState])
    );
    setMenuState(newState);
    setMainMenuState(!mainMenuState);
  };

  // Maneja el check/uncheck de los submenús
  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setMenuState((prevState) => {
      const updatedState = { ...prevState, [id]: checked };

      // Si cualquier submenú está activo, activa el principal
      const anyChecked = Object.values(updatedState).some((value) => value);
      setMainMenuState(anyChecked);

      return updatedState;
    });
  };

  // Sincroniza el estado del menú principal si todos los submenús están seleccionados
  useEffect(() => {
    const allChecked = Object.values(menuState).every((value) => value);
    if (allChecked) {
      setMainMenuState(true);
    }
  }, [menuState]);

  return (
    <div className="w-[100%] flex flex-col gap-[0.5rem]">
      <div className="flex items-center gap-[1rem]">
        <input
          checked={mainMenuState}
          onChange={handleSetFullMenu}
          type="checkbox"
          className="w-[1rem] h-[1rem]"
        />
        <p className="text-black font-bold">{menuName}</p>
      </div>
      {subMenuOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center gap-[1rem] pl-[1rem] scale-[0.9]"
        >
          <input
            id={option.id}
            checked={menuState[option.id]}
            onChange={handleCheckboxClick}
            type="checkbox"
            className="w-[1rem] h-[1rem]"
          />
          <p className="text-black font-bold">{option.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NewUserMenusCheckbox;
