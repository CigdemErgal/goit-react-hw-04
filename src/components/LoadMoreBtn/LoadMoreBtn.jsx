import styles from "./LoadMoreBtn.module.css";

// SONRAKI SAYFA SONUCLARINI YUKLEMEK ICIN BUTON GOSTERIR.
const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Daha Fazla Yukle
    </button>
  );
};

export default LoadMoreBtn;
