// appjsx mimarisini olusturuyoruz.

import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import { fetchImages } from "./services/unsplash-api.js";
import { Toaster } from "react-hot-toast";
import styles from "./App.module.css";

//state akisindan sonra hangi proplari hangi componente dağıtacaksin? ilgili componente .
function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  //handlesearch fonksiyonu kullanici yeni arama yaptiginda sifirdan o aramaya hazirlayan fonk.dur
  //ne yapar? yeni query state yazar, page tekrar1 yapar,eski image listesini temizler.eski hatayi da.
  //olay yoneticileri
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); //sayfayi basa sar.
    setImages([]); //yeni arama yapildiginda eski resimleri temizle

    setError(null); //yeni arama yapildiginda eski hatayi temizle
    setSelectedImage(null); //yeni arama yapildiginda acik olan modal varsa kapat.
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //useeffect ile query(arama terimi) veya page degistiginde yeni resimleri fetch ediyoruz.
  // amaci kullanici yeni arama yaptiginda veya load more butonuna bastiginda yeni resimleri getirmek.

  useEffect(() => {
    if (!query) return; //arama bos ise hicbir sey yapma.

    const getImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchImages(query, page);
        //onceki resimlerin uzerine yeni resimleri ekle.
        // eger page 1 ise sadece yeni resimleri koy, yoksa eski resimlerin uzerine ekle.
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

  //modal acma kapama handleri yaziyoruz. bu fonksiyon imagegallery componentinden
  // cagirilan gorseli selectedimage state ine atiyor.
  // bu state image modal componentine gonderilecek ve modalda gosterilecek.

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  //render goruntuleme kismi. burada searchbar, imagegallery, imagemodal, loader, loadmorebtn ve errormessage componentlerini kullanarak uygulamanin gorunumunu olusturuyoruz.

  return (
    <div className={styles.appContainer}>
      <Toaster position="top-center" />
      {/*arama cubugu*/}

      <SearchBar onSubmit={handleSearch} />

      <ImageGallery images={images} onSelectImage={openModal} />

      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={closeModal}
      />
      {loading && <Loader />}
      {!loading && images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default App;
