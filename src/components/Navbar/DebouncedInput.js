import { useEffect, useState } from "react";

const DebouncedInput = ({ onInput }) => {
    const [inputValue, setInputValue] = useState("");
  
    useEffect(() => {
      const delay = 800; // Daha uzun bir gecikme süresi deneyin
      const timeoutId = setTimeout(() => {
        onInput(inputValue);
      }, delay);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [inputValue, onInput]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      console.log(inputValue, "INPUTTTTTTTTTTTTTTTT");
    };
  
    return (
      <input
        type="text"
        placeholder="Search something.."
        value={inputValue}
        onChange={handleInputChange}
        className="text-black w-full border-0  focus:outline-none"
      />
    );
  };
  
  export default DebouncedInput;
  