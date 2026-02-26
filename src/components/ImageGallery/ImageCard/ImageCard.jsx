import css from "./ImageCard.module.css";

const ImageCard = ({ image, onSelectImage }) => {
    return (
        <button type="button" className={css.card} onClick={() => onSelectImage(image)}>
            <img
                src={image.urls.small}
                alt={image.alt_description || "Image"}
                className={css.image}
                loading="lazy"
            />
        </button>
    );
};

export default ImageCard;
