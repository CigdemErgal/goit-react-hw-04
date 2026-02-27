//Daha Fazla Yükle Butonu
//LoadMoreBtn bileşeni, "Daha Fazla Yükle" yazısıyla bir buton oluşturur. Butona tıklandığında, bir sonraki resim setinin yüklenmesi ve mevcut resimlerle birlikte render edilmesi gerekmektedir.
//Buton, yalnızca yüklenmiş herhangi bir resim olduğunda render edilmelidir.
//sim dizisi boşsa, buton render edilmez.

import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            Daha Fazla Yükle
        </button>
    );
};

export default LoadMoreBtn;