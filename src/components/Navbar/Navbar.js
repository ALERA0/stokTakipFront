import { AppContext } from "@/src/pages/_app";
import React, { useContext, useState } from "react";
import DebouncedInput from "./DebouncedInput"; // Bu satırı eklemeyi unutmayın

const Navbar = () => {
  const { setSearchQuery } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (inputValue) => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="w-full flex justify-between py-6 items-center pl-8 pr-8 bg-dark-purple h-28 text-white">
      <div className="w-2/5">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="pr-4 w-full">
            <DebouncedInput onInput={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
