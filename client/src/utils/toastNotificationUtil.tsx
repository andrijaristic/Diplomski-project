import { toast } from "react-toastify";

export const errorNotification = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2500,
    closeOnClick: true,
    pauseOnHover: false,
  });
};

export const successNotification = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2500,
    closeOnClick: true,
    pauseOnHover: false,
  });
};
