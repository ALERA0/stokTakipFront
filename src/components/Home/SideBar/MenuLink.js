import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuLink = ({ src, menuTitle, open,href }) => {
  return (
    <li
      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
             my-5 `}
    >
      <Link href={href} className="flex gap-x-4">
        <Image src={src} />
        <span
          className={`${
            !open && "hidden"
          } origin-left duration-200 text-lg font-bold `}
        >
          {menuTitle}
        </span>
      </Link>
    </li>
  );
};

export default MenuLink;
