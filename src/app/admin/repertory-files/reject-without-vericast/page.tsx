import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header title="Rechazar Sin Envio a Vericast" />
      <div className="w-[100%] flex justify-end mt-[1rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>

      <div className="pr-[2rem] pl-[2rem]">
        <CustomInput type="text" label="Buscar" className="w-[10rem]" />
      </div>

      <div className="mt-[2rem] relative">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                {""}
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                TITULO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ALBUM
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ARTISTA
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ISRC
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                USUARIO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                FECHA
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-4">Por Mil Noches</td>
                <td className="px-6 py-4">Libertad</td>
                <td className="px-6 py-4 text-mainblue">Airbag</td>
                <td className="px-6 py-4">467928732</td>
                <td className="px-6 py-4 text-mainblue">user123@gmail.com</td>
                <td className="px-6 py-4">01/10/24</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-[3rem] flex pr-[2rem] pl-[2rem] gap-[1rem]">
        <CustomButton>Rechazar</CustomButton>
      </div>
    </CustomLayout>
  );
}
