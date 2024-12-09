import React, { FC, isValidElement, ReactNode, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import dragTableFunctions from "@/hooks/dragTableFunctions";
import "./CustomTable.css";

type columnValueType = string | number | ReactNode;

interface CustomTableProps {
  columnNames: { name: string; isSortable: boolean; selectBox?: boolean }[];
  columnValues: columnValueType[][];
}

const CustomTable: FC<CustomTableProps> = ({ columnNames, columnValues }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = dragTableFunctions(scrollContainerRef);

  const [sortConfig, setSortConfig] = useState<{
    key: number | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const handleSort = (columnIndex: number) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === columnIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnIndex, direction });
  };

  const sortedColumnValues = [...columnValues].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  return (
    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-[100%] relative overflow-x-auto cursor-grab table-container mb-[5rem]"
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-l-2 border-r-2">
          <tr className="border-l-2 border-r-2">
            {columnNames.map(
              (
                element: {
                  name: string;
                  isSortable: boolean;
                  selectBox?: boolean;
                },
                index: number
              ) => (
                <th
                  key={index}
                  scope="col"
                  className={`${element.selectBox ? "px-1 py-3" : "px-1 py-3"} font-bold cursor-pointer border-l-2 border-r-2`}
                  onClick={() => handleSort(index)}
                >
                  <div className="flex justify-center items-center gap-[0.3rem] relative h-[100%] w-[100%] pr-[2rem]">
                    <p className="text-center w-[100%] flex justify-center ml-[2rem]">
                      {element.name}
                    </p>
                    {element.isSortable && (
                      <span className="absolute right-0">
                        {sortConfig.key === index ? (
                          sortConfig.direction === "asc" ? (
                            <IoMdArrowDropup size={20} />
                          ) : (
                            <IoMdArrowDropdown size={20} />
                          )
                        ) : (
                          <IoMdArrowDropdown size={20} color="#c5c5c5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {sortedColumnValues.map(
            (element: columnValueType[], index: number) => (
              <tr
                className="border-b"
                style={{ backgroundColor: "white", color: "black" }}
                key={index}
              >
                {element.map((record: columnValueType, index: number) => (
                  <td key={index} className="px-6 py-4 font-medium">
                    <div className="flex justify-center">
                      {isValidElement(record) ? (
                        record
                      ) : (
                        <p className="text-center text-black">{record}</p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
