import { toast, ToastPosition, Theme } from 'react-toastify';

type ToastParams = {
  message: string;
  position?: ToastPosition;
  theme?: Theme;
};

const useToast = () => {
  const showErrorToast = ({ message, position = 'top-right', theme = 'light' }: ToastParams) => {
    toast.error(message, {
      position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  };

  const showSuccessToast = ({ message, position = 'top-right', theme = 'light' }: ToastParams) => {
    toast.success(message, {
      position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  };

  const showWarningToast = ({ message, position = 'top-right', theme = 'light' }: ToastParams) => {
    toast.warn(message, {
      position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  };

  return {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
  };
};

export default useToast;
