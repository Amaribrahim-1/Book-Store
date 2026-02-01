import { toast } from "react-toastify";

export function showNotification(type, message, theme = "light") {
  toast.dismiss();
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme,
    closeOnClick: true,
  });
}
