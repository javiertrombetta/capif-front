"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
// import { IoCloseSharp } from "react-icons/io5";

function page() {
  // const [availableSections, setAvailableSections] = useState<string[]>([]);

  // const selectSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setAvailableSections((prevState: string[]) => {
  //     return [...prevState, e.target.value];
  //   });
  // };
  // const removeString = (str: string) => {
  //   setAvailableSections((prevItems: string[]) =>
  //     prevItems.filter((item) => item !== str)
  //   );
  // };

  return (
    <CustomLayout>
      <Header title="Alta de Productor Secundario" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] flex flex-col gap-[1rem]">
        <p className="text-black">
          Escriba el correo electrónico del usuario al cual desea dar de alta.
        </p>
        <div className="w-[28rem] flex justify-center"></div>
        <CustomInput className="w-[28rem]" type="text" label="Email" />
        <CustomInput
          className="w-[28rem]"
          type="text"
          label="Confirmar Email"
        />
        <CustomInput className="w-[28rem]" type="text" label="Nombres" />
        <CustomInput className="w-[28rem]" type="text" label="Apellidos" />
        <CustomInput className="w-[28rem]" type="text" label="Teléfono" />
        <div>
          <p className="font-bold text-black">
            Secciones Habilitadas del Perfil
          </p>
          {/* <select
            value={"none"}
            onChange={selectSection}
            className="w-[28rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
          >
            <option value={""}>SELECCIONAR</option>

            <option value={"Repertorio"}>REPERTORIO</option>
            <option value={"Productoras"}>PRODUCTORAS</option>
            <option value={"Usuarios"}>USUARIOS</option>
            <option value={"Cuentas Corrientes"}>CUENTAS CORRIENTES</option>
          </select> */}
        </div>
        <div className="w-[28rem] flex flex-col gap-[1rem]">
          <div className="flex items-center gap-[1rem]">
            <input type="checkbox" className="w-[1rem] h-[1rem]" />
            <p className="text-black font-bold">Repertorio</p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <input type="checkbox" className="w-[1rem] h-[1rem]" />

            <p className="text-black font-bold">Productoras</p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <input type="checkbox" className="w-[1rem] h-[1rem]" />

            <p className="text-black font-bold">Usuarios</p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <input type="checkbox" className="w-[1rem] h-[1rem]" />

            <p className="text-black font-bold">Cuentas Corrientes</p>
          </div>
        </div>
        <CustomButton>Enviar Invitación</CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;

/*
{availableSections.length > 0
            ? availableSections.map((element: string, index: number) => (
                <div
                  className="border-[2px] border-mainblue flex items-center justify-center pr-[1rem] pl-[1rem] rounded-[0.5rem] relative"
                  key={index}
                >
                  <button
                    onClick={() => removeString(element)}
                    className="absolute top-[3%] right-[3%]"
                  >
                    <IoCloseSharp color="red" size={13} />
                  </button>
                  <p className="font-bold text-mainblue text-center text-[0.8rem]">
                    {element}
                  </p>
                </div>
              ))
            : null}

*/
