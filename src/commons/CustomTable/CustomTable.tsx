import React, { FC, ReactNode } from "react";

type columnValueType = string | number | ReactNode;

interface CustomTableProps {
  columnNames: string[];
  columnValues: columnValueType[][];
}

const CustomTable: FC<CustomTableProps> = ({ columnNames, columnValues }) => {
  return (
    <div className="w-[100%] pl-[1rem] pr-[1rem]">
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columnNames.map((element: string, index: number) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 font-bold text-[1rem]"
                >
                  {element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columnValues.map((element: columnValueType[], index: number) => (
              <tr key={index}>
                {element.map((record: columnValueType, index: number) => (
                  <td key={index} className="px-6 py-4">
                    {record}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;

/*

  const columnNames: string[] = [
    "FECHA INICIO",
    "FECHA VENCIMIENTO",
    "ESTADO",
    "ACCIÓN",
  ];
  const columnValues = [
    ["28-11-2022", "20-12-2022", "Repertorio controvertido", "Registrar"],
    ["28-11-2022", "20-12-2022", "Repertorio controvertido", "Registrar"],
    ["28-11-2022", "20-12-2022", "Repertorio controvertido", "Registrar"],
  ];

*/
