import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard.jsx";

const ImageGallery = ({ images, onSelectImage }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onSelectImage={onSelectImage} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
