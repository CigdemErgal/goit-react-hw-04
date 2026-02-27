import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

// BUYUK GORSEL VE EK BILGILERI MODAL ICINDE GOSTERIR.
function ImageModal({ isOpen, image, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <>
          <img src={image.urls.regular} alt={image.alt_description || "Image"} />
          <p>Author: {image.user?.name || "Unknown"}</p>
          <p>Likes: {image.likes ?? 0}</p>
          <p>
            Description: {image.description || image.alt_description || "No description available."}
          </p>
        </>
      )}
    </Modal>
  );
}

export default ImageModal;
