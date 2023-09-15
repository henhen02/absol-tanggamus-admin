import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useNotif = () => {
  const MySwal = withReactContent(Swal);

  const successNotif = (title, text) => {
    MySwal.fire({
      icon: "success",
      title: title,
      text: text,
    });
  };

  const errorNotif = (title, text) => {
    MySwal.fire({
      icon: "error",
      title: title,
      text: text,
    });
  };

  const warningNotif = (title, text) => {
    MySwal.fire({
      icon: "warning",
      title: title,
      text: text,
    });
  };

  const infoNotif = (title, text) => {
    MySwal.fire({
      icon: "info",
      title: title,
      text: text,
    });
  };

  const closeNotif = () => {
    MySwal.close();
  };

  return { successNotif, errorNotif, warningNotif, infoNotif, closeNotif };
};
