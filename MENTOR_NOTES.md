# GoIT React HW-04 - Mentor Notları (Sade)

## 1) Proje Özeti
Bu ödevde, Unsplash API ile çalışan bir görsel arama uygulaması geliştirdik.
Ana mimari `App.jsx` içinde kuruldu; bileşenler prop/callback ile bağlandı.

## 2) Mimari (App.jsx)

### Ne yaptık?
- Ana state'leri `App` içinde topladık: `query`, `page`, `images`, `loading`, `error`, `totalPages`, `selectedImage`.
- Olay fonksiyonlarını yazdık: `handleSearch`, `handleLoadMore`, `openModal`, `closeModal`.
- `useEffect([query, page])` ile API çağrısını otomatik tetikledik.

### Neden?
- Veri akışını tek merkezden yönetmek için.
- Arama, sayfalama, modal, loading/error senaryolarını tutarlı yapmak için.

### Nerede?
- `src/App.jsx`

### Kontrol noktası
- Yeni aramada liste sıfırlanır.
- `Load more` ile sonuçlar eklenir.
- Hata olursa mesaj görünür.
- Kart tıklanınca modal açılır.

## 3) API Katmanı

### Ne yaptık?
- `fetchImages(query, page, perPage)` fonksiyonunu yazdık.
- `axios` ile `https://api.unsplash.com/search/photos` endpoint'ine istek attık.
- `results` ve `total_pages` döndürdük.

### Neden?
- UI ile HTTP kodunu ayırmak için.

### Nerede?
- `src/services/unsplash-api.js`

### Kontrol noktası
- Network'te doğru endpoint görünmeli.
- Hatalı key durumunda `401` dönebilir (kod değil, key sorunu).

## 4) Bileşenler ve Sorumlulukları

### SearchBar
- `onSubmit` prop'u alır.
- Boş aramada `react-hot-toast` ile uyarı verir.
- Dosyalar:
  - `src/components/SearchBar/SearchBar.jsx`
  - `src/components/SearchBar/SearchBar.module.css`

### ImageGallery
- `images` dizisini `ul > li` olarak render eder.
- Her öğede `ImageCard` kullanır.
- Dosyalar:
  - `src/components/ImageGallery/ImageGallery.jsx`
  - `src/components/ImageGallery/ImageGallery.module.css`

### ImageCard
- Tek görsel kartı (`div > img`) render eder.
- Tıklamada `onSelectImage(image)` çağırır.
- Dosyalar:
  - `src/components/ImageCard/ImageCard.jsx`
  - `src/components/ImageCard/ImageCard.module.css`

### ImageModal
- `react-modal` kullanır.
- `isOpen`, `image`, `onClose` prop alır.
- `ESC` ve overlay click ile kapanır.
- `urls.regular`, `author`, `likes`, `description fallback` gösterir.
- Dosyalar:
  - `src/components/ImageModal/ImageModal.jsx`
  - `src/components/ImageModal/ImageModal.module.css`

### Loader
- Yükleme sırasında görünür.
- Dosyalar:
  - `src/components/Loader/Loader.jsx`
  - `src/components/Loader/Loader.module.css`

### ErrorMessage
- HTTP hata mesajını gösterir.
- Dosyalar:
  - `src/components/ErrorMessage/ErrorMessage.jsx`
  - `src/components/ErrorMessage/ErrorMessage.module.css`

### LoadMoreBtn
- Sonraki sayfayı yüklemek için buton.
- Sadece gerekli durumda render edilir.
- Dosyalar:
  - `src/components/LoadMoreBtn/LoadMoreBtn.jsx`
  - `src/components/LoadMoreBtn/LoadMoreBtn.module.css`

## 5) Render Kuralları (Önemli)
- Galeri sadece `images.length > 0` ise render edilir.
- Hata varsa `ErrorMessage` gösterilir.
- `loading` true iken `Loader` görünür.
- `page < totalPages` ve veri varsa `LoadMoreBtn` görünür.

## 6) Kısa JR Cheat Sheet
- `Container` (App): state + API + iş mantığı
- `UI Component`: sadece görünüm + props
- Veri yukarıdan aşağı (`props down`)
- Olaylar aşağıdan yukarı (`events up`)
- API çağrısı `useEffect` içinde
- JSX yorum: `{/* yorum */}`
- İsimlendirme:
  - Parent handler: `handleX`
  - Child prop: `onX`
  - State setter: `setX`

## 7) Teslim Öncesi Kontrol
- [ ] Console hata/uyarı yok
- [ ] Arama çalışıyor
- [ ] Load more çalışıyor
- [ ] Modal aç/kapa (ESC + overlay) çalışıyor
- [ ] Boş aramada toast çıkıyor
- [ ] Galeri `small`, modal `regular` kullanıyor
- [ ] Bileşen klasör yapısı görevle uyumlu
