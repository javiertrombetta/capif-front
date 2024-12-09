"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItemSidebarType } from "@/types/types";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import "./ItemSidebar.css";

interface ItemSidebarProps {
  element: ItemSidebarType;
}

const ItemSidebar: FC<ItemSidebarProps> = ({ element }) => {
  const pathname = usePathname();

  if (element.link) {
    return (
      <Link
        href={element.link}
        className={`flex items-center gap-[0.5rem] ${element.link === pathname ? "menu-option-selected" : "menu-option"}`}
      >
        {pathname === element.link ? (
          <FaCircle size={12} />
        ) : (
          <FaRegCircle size={12} />
        )}
        <p>{element.name}</p>
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-[0.5rem] menu-option">
      {<FaCircle size={12} />}
      <p>{element.name}</p>
    </div>
  );
};

export default ItemSidebar;
