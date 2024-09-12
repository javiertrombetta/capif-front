import React from "react";
import { FaEdit } from "react-icons/fa";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Usuarios
        </h1>
      </div>

      <div className="w-[100%] mt-[1.5rem] flex justify-end pr-[1rem]">
        <button className="text-white w-[9rem] h-[2.5rem] bg-[#1280e1] text-[0.9rem]">
          Nuevo Usuario
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-[1rem]">
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              USUARIO EMAIL
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              ACCIÓN
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index: number) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                admin@gmail.com
              </th>
              <td className="px-6 py-4">
                <button className="flex justify-center items-center gap-[0.3rem] border-[1px] border-[#737373] hover:border-black p-[0.3rem] rounded-[0.3rem]">
                  <FaEdit color="black" className="mb-[0.2rem]" />
                  <p className="text-[1rem] text-[black]">Editar</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
