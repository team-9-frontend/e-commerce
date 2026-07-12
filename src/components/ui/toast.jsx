import toast from "react-hot-toast";

const Toast = {
  success: (message) => toast.success(message),

  error: (message) => toast.error(message),

  loading: (message) => toast.loading(message),

  custom: (message) => toast(message),
};

export default Toast;