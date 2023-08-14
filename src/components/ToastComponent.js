import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccesMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
  console.log("TOAST ÇALIŞTI ASLINDA ");
};

export const showToastErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
  console.log("TOAST ÇALIŞTI ASLINDA ");
};
