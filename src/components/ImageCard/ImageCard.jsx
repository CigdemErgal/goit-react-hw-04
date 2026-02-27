import css from "./ImageCard.module.css";

// TEK BIR RESIM KARTI GOSTERIR VE TIKLANINCA SECILI GORSELI USTE BILDIRIR.
const ImageCard = ({ image, onSelectImage }) => {
  return (
    <div className={css.card} onClick={() => onSelectImage(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className={css.image}
        loading="lazy"
      />
    </div>
  );
};

export default ImageCard;
