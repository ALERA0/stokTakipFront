import React, { useState } from "react";

import Chart_fill from "../../../../public/images/Chart_fill.png";
import control from "../../../../public/images/control.png";
import Folder from "../../../../public/images/Folder.png";
import logo from "../../../../public/images/logo2.png";
import product from "../../../../public/images/product2.png";
import supplier from "../../../../public/images/supplier.png";
import order from "../../../../public/images/order.png";

import Image from "next/image";
import MenuLink from "./MenuLink";

const Menu = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <Image
          src={control}
          className={`absolute md:hidden cursor-pointer -right-3 top-9 w-7  border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Image
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Pengona Yazılım
          </h1>
        </div>
        <ul className="pt-6">
          <MenuLink src={Chart_fill} menuTitle={"Ürün Stoğu"} open={open} href={"/"} />
          <MenuLink src={Folder} menuTitle={"Belgeler"} open={open} href={"/"} />
          <MenuLink src={order} menuTitle={"Ürün Girişi"} open={open} href={"/"}/>
          <MenuLink src={product} menuTitle={"Ürün çıkışı"} open={open} href={"/"}/>
          <MenuLink src={supplier} menuTitle={"Cari"} open={open} href={"/"}/>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
