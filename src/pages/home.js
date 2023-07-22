import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutProcess } from "../api";

const home = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutProcess());
  };

  return (
    <div className="w-full h-full py-28">
      <div className="w-4/5 flex justify-center items-center h-full gap-14 mx-auto">
        <div className="w-full h-full grid grid-cols-2 gap-8  justify-center items-center mx-auto">
          <Button className="flex justify-center items-center bg-blue-700 text-white">CARİ</Button>
          <Button className="flex justify-center items-center bg-blue-700 text-white">STOK</Button>
        </div>
        
      </div>
      <Button onClick={logout} className="mx-auto">Çıkış Yap</Button>
    </div>
  );
};

export default home;
