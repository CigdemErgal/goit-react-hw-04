import css from "./ErrorMessage.module.css";

// API HATASI OLUSTUGUNDA KULLANICIYA MESAJ GOSTERIR.
const ErrorMessage = ({ message }) => {
  return <p className={css.error}>{message}</p>;
};

export default ErrorMessage;
