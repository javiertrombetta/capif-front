import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Listado de Pagos
        </h1>
      </div>
      <div className="mt-[2rem] pl-[1rem]">
        <label className="font-bold text-black">Buscar:</label>
        <CustomInput clasName="ml-[0.5rem]" type="text" />
      </div>
      <div className="mt-[2rem] flex justify-center items-center pl-[1rem] pr-[1rem] gap-[2rem]">
        <div className="flex flex-col w-[50%]">
          <label className="text-[black] font-bold">FECHA PAGO DESDE</label>
          <CustomInput type="date" />
        </div>

        <div className="flex flex-col w-[50%]">
          <label className="text-[black] font-bold">FECHA PAGO HASTA</label>
          <CustomInput type="date" />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-[3rem]">
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              NOMBRE DE DISCO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              SUBTOTAL
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              RETENCIÓN
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              TOTAL
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              FECHA PAGO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              USUARIO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              CUIT
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((_, index: number) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap "
              >
                administracion@fiftyone.com.ar - FIFTY ONE MUSIC SRL
              </th>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">$34.313,23</td>
              <td className="px-6 py-4">admin@gmail.com</td>
              <td className="px-6 py-4">administracion@fiftyone.com.ar</td>
              <td className="px-6 py-4">12-34567891-2</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
