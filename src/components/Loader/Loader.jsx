//apı cağrisi sırasında yüklenme durumunu göstermek için Loader.jsx bileşeni oluşturacağız. 

import styles from "./Loader.module.css";

const Loader = () => {
    return <p className={styles.loader}>Loading...</p>;
};

export default Loader;