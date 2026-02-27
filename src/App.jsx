import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import { fetchImages } from "./services/unsplash-api.js";
import styles from "./App.module.css";

function App() {
  // UYGULAMANIN ANA STATE'LERI
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // YENI ARAMA BASLAT: SAYFAYI SIFIRLA, ESKI LISTE/HATA/MODALI TEMIZLE
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setSelectedImage(null);
  };

  // SONRAKI SAYFAYI GETIR
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // QUERY VEYA PAGE DEGISINCE API'DEN VERI CEK
  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchImages(query, page);
        setImages((prev) =>
          page === 1 ? data.results : [...prev, ...data.results],
        );
        setTotalPages(data.total_pages);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={styles.appContainer}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />

      {/* HATA VARSA SADECE HATA MESAJI GOSTER */}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {/* GALERI SADECE VERI GELDIYSE RENDER EDILIR */}
          {images.length > 0 && (
            <ImageGallery images={images} onSelectImage={openModal} />
          )}

          {loading && <Loader />}

          {!loading && images.length > 0 && page < totalPages && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {/* MODAL SECILEN GORSEL VARSA ACILIR */}
      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;

