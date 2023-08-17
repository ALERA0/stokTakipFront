import React from "react";

const Footer = () => {
  return (
    <div className=" absolute bottom-0  w-full border-t-2 border-solid border-white py-1  bg-light">
      <p className="text-center text-sm text-[#000B27 ] ">
        © 2006 - {new Date().getFullYear()} Pengona Software, Tüm Hakları
        Saklıdır. Kurumsal Web Sitesi Pengona Software tarafından yapılmıştır.
      </p>
    </div>
  );
};

export default Footer;
