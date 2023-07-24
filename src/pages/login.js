import React, { useState } from "react";
import inventory from "../../public/images/inventory.png";
import logo from "../../public/images/logo.jpg";
import Image from "next/image";
import { Alert, Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../api";
import { useRouter } from "next/router";

export const login = () => {
  const dispatch = useDispatch();

  const [email, setMail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");

  const { status } = useSelector((state) => state.auth);

  const [path, setPath] = useState("/login");
  const router = useRouter();

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Alert Title", "My Alert Msg", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      dispatch(authLogin({ email, password }))
        .then((result) => {
          if (result.payload && result.payload.status === "success") {
            setPath("/");
            console.log(path, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            
            router.push("/"); // Sayfayı "/home" yoluna yönlendir
          } else {
            setPath("/login");
            console.log(path, "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
          }
        })
        .catch((error) => {
          console.log(error);
          setPath("/login");
        });
    }
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center  ">
      <div className="w-full  h-full py-24 lg:px-12 md:px-6 px-2 flex justify-center items-center  bg-[#DEE3F0] ">
        <div className="grid grid-cols-3 bg-white">
          <div className="w-full lg:col-span-1 col-span-3 h-full flex flex-col   lg:px-6 py-8">
            <Image
              src={logo}
              className=" w-2/5 rounded-lg flex justify-center mx-auto"
              alt="logo"
            />
            <div className="h-4/5 w-full flex flex-col lg:pt-28 2xl:px-8 md:pt-14 lg:px-2 pt-10 px-2 gap-9 items-center">
              <h2 className="lg:text-3xl text-center w-full  md:text-2xl text-xl font-bold">
                Tekrardan Hoşgeldiniz
              </h2>
              <p className="text-lg font-semibold">Lütfen Giriş Yapınız</p>
              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
              />
              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                className="w-full h-12 rounded-lg duration-300 hover:text-[#000E36] bg-[#000E36] text-white text-center flex justify-center font-bold hover:bg-[#FF8A00] items-center"
                href={path}
                onClick={handleLogin}
              >
                Giriş Yap
              </Link>
            </div>
          </div>
          <div className="w-full lg:col-span-2  lg:flex hidden justify-center items-center">
            <Image
              src={inventory}
              className=" w-4/5 hidden  lg:flex justify-center items-center "
              alt="inventory"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
