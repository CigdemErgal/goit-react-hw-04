# GoIT React HW-04 - Mentor Notları

## 1) App.jsx Kontrol Sonucu

Mevcut dosyada temel mimari doğru yönde ama birkaç kritik tip ve akış düzeltmesi gerekiyor:

- `query` state'i `[]` yerine `""` (string) olmalı.
- `page` state'i `""` yerine `1` (number) olmalı.
- `images` state'i `1` yerine `[]` (array) olmalı.
- `fetchImages` import yolu dosya adıyla hizalı olmalı (`unsplash-api.js` ile aynı isim).
- `App` component'i JSX döndürmeli (`return (...)`).

Kısa doğru state örneği:

```jsx
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [totalPages, setTotalPages] = useState(0);
const [selectedImage, setSelectedImage] = useState(null);
```

## 2) Servis Notu (unsplash-api.js)

Endpoint tarafında şu kullanım hatalıdır:

```js
axios.get("./search/photos", ...)
```

Doğru yaklaşım `BASE_URL` ile tam endpoint kullanmaktır:

```js
axios.get(`${BASE_URL}/search/photos`, ...)
```

## 3) Prop'ları Neye Göre Belirliyoruz?

Mantık: `App` içindeki her state için şu soruyu sorarız:

- Bu veriyi hangi child component **okuyacak**?
- Bu veriyi hangi child component bir event ile **tetikleyecek/değiştirecek**?

Bu yüzden prop planı şu şekilde çıkar:

- `SearchBar` -> `onSubmit`
- `ImageGallery` -> `images`, `onSelectImage`
- `ImageModal` -> `isOpen`, `image`, `onClose`
- `LoadMoreBtn` -> `onClick`
- `Loader` -> `loading` true olduğunda render
- `ErrorMessage` -> `error` varsa render

Özet: Prop tasarımı, component sorumluluğu + veri akışından türetilir.

## 4) Neden Bazı useState Değerleri null / 0 / 1 / false?

Başlangıç değerini state tipine ve ilk ekran senaryosuna göre seçeriz:

- `null`: Henüz yok / seçilmedi (`selectedImage`, çoğu durumda `error`)
- `0`: Sayısal ama başlangıçta "bilinmiyor/yok" (`totalPages`)
- `1`: Sayfalama başlangıcı (`page`)
- `false`: Boolean bayrak başlangıcı (`loading`)

Kural: State'in ilk değeri, hem veri tipini doğru temsil etmeli hem de ilk render davranışını doğru kurmalıdır.

## 5) Kontrol Noktası

Bu düzeltmeler sonrası:

- Uygulama açılışında crash olmamalı.
- Console'da type mismatch kaynaklı hata/uyarı olmamalı.
- `App` render döndürmeli ve component prop zinciri çalışmalı.

## 6) Sonraki Adım

- `handleSearch` ve `handleLoadMore` fonksiyonlarını `App.jsx` içinde tanımlayıp ilgili component'lere prop olarak bağlayacağız.
- Ardından `useEffect` ile `query/page` değişiminde `axios` çağrısı yapılacak.

## 7) Çalışma Biçimi (Bundan Sonra Her Adımda)

Her adımı şu 4 başlıkla kaydedeceğiz:

- **Ne yapıyoruz?** (1-2 cümle)
- **Neden yapıyoruz?** (1 cümle)
- **Nerede yapıyoruz?** (dosya yolu + component)
- **Kontrol noktası** (nasıl test edeceğiz)

Not: Önce zorunlu ödev maddelerini bitireceğiz, sonra ekstralar (sticky header, masonry, hover overlay, favoriler) gelecek.

## 8) Adım Günlüğü

### Adım 1 - App state mimarisi

- **Ne yapıyoruz?** `App.jsx` içinde ana state akışını (`query`, `page`, `images`, `loading`, `error`, `totalPages`, `selectedImage`) merkezde topluyoruz ve child component'lere doğru prop'ları planlıyoruz.
- **Neden yapıyoruz?** Arama, sayfalama, modal ve hata/yüklenme davranışlarının tek bir kaynaktan yönetilmesi için.
- **Nerede yapıyoruz?** `src/App.jsx` - `App` component'i.
- **Kontrol noktası:** Uygulama açıldığında crash olmaması, console'da hata/uyarı olmaması, modal başlangıçta kapalı olması (`selectedImage === null`).

### Adım 2 - (Sıradaki)

- **Ne yapıyoruz?** `handleSearch` ve `handleLoadMore` fonksiyonlarını yazıp ilgili component prop'larına bağlayacağız.
- **Neden yapıyoruz?** Arama başlatma ve sonraki sayfayı yükleme akışını kullanıcı etkileşimine bağlamak için.
- **Nerede yapıyoruz?** `src/App.jsx` (`SearchBar`, `LoadMoreBtn` ile prop bağlantıları).
- **Kontrol noktası:** Yeni aramada `page` tekrar 1'e dönmeli, eski görseller temizlenmeli; "Load more" tıklanınca `page` artmalı.

### Adım 2 - handleSearch + handleLoadMore

- **Ne yapıyoruz?** `handleSearch` ile yeni aramada `query` güncelleyip `page` değerini 1'e çekiyoruz, eski `images` ve `error` durumunu temizliyoruz. `handleLoadMore` ile `page` değerini bir artırıyoruz.
- **Neden yapıyoruz?** Yeni aramanın önceki sonuçlara eklenmeden temiz başlaması ve "Load more" ile bir sonraki sayfanın yüklenmesi için.
- **Nerede yapıyoruz?** `src/App.jsx` - `App` component'i.
- **Kontrol noktası:** Arama gönderince eski sonuçlar temizlenmeli; butona basınca `page` artmalı.

### Adım 3 - useEffect ile API fetch akışı

- **Ne yapıyoruz?** `useEffect([query, page])` ile `fetchImages(query, page)` çağrısı ekledik; `try/catch/finally` içinde `loading`, `error`, `images`, `totalPages` state'lerini yönetiyoruz.
- **Neden yapıyoruz?** Arama terimi veya sayfa değiştiğinde veri çekimini otomatik ve güvenli şekilde yapmak için.
- **Nerede yapıyoruz?** `src/App.jsx` - `App` component'i.
- **Kontrol noktası:** `query` boşken fetch olmamalı; arama sonrası görseller gelmeli; load more sonrası listeye eklenmeli; hata olursa mesaj set edilmeli.

### Adım 4 - Servis endpoint düzeltmesi

- **Ne yapıyoruz?** `axios.get("./search/photos")` yerine `axios.get(`${BASE_URL}/search/photos`)` kullandık.
- **Neden yapıyoruz?** API isteğinin göreli path yerine doğru Unsplash endpoint'ine gitmesi için.
- **Nerede yapıyoruz?** `src/services/unsplash-api.js` - `fetchImages` fonksiyonu.
- **Kontrol noktası:** Network isteği `https://api.unsplash.com/search/photos` adresine gitmeli.

### Adım 5 - Koşullu render + modal bağlantısı

- **Ne yapıyoruz?** `SearchBar`, `ImageGallery`, `Loader`, `ErrorMessage`, `LoadMoreBtn` koşullu renderlarını `return` içinde topladık. Ayrıca `openModal/closeModal` ile `selectedImage` state'ini `ImageModal` props'larına bağladık (`isOpen`, `image`, `onClose`).
- **Neden yapıyoruz?** UI'nin yüklenme/hata/sayfalama durumlarını doğru göstermesi ve tıklanan görselin modalda açılması için.
- **Nerede yapıyoruz?** `src/App.jsx` - `App` component'i.
- **Kontrol noktası:** Aramada liste görünmeli; yüklenirken loader çıkmalı; hata olursa mesaj görünmeli; kart tıklayınca modal açılmalı.

### Mevcut Durum Notu

- `App.jsx` akışı bu aşama için doğru durumda.
- Ancak `src/components` altındaki component dosyaları şu an boş (`0 byte`) göründüğü için proje çalıştırıldığında derleme hatası oluşur.
- Bir sonraki adımda component içeriklerini (özellikle `SearchBar`, `ImageGallery`, `ImageCard`, `ImageModal`) dolduracağız.

## App.jsx Mimari Özeti

- `App`, uygulamanın ana kontrol merkezi olacak şekilde kurgulandı.
- Ana state'ler `App` içinde toplandı: `query`, `page`, `images`, `loading`, `error`, `totalPages`, `selectedImage`.

### Ne yaptık?

- `handleSearch` akışını kurduk:
  - Yeni arama terimini (`query`) güncelliyor.
  - `page` değerini 1'e çekiyor.
  - Eski görselleri (`images`) temizliyor.
  - Eski hatayı (`error`) temizliyor.
  - Açık modal varsa kapatıyor (`selectedImage = null`).

- `handleLoadMore` akışını kurduk:
  - `page` değerini bir artırıyor.
  - Böylece bir sonraki sayfanın fetch edilmesini tetikliyor.

- `useEffect([query, page])` ile veri çekme mekanizmasını kurduk:
  - `query` boşsa fetch yapılmıyor.
  - `fetchImages(query, page)` çağrılıyor.
  - `page === 1` ise liste sıfırdan kuruluyor.
  - `page > 1` ise yeni sonuçlar mevcut listeye ekleniyor.
  - `totalPages` güncelleniyor.
  - `loading`, `error` durumları `try/catch/finally` ile yönetiliyor.

- Modal state akışını bağladık:
  - `openModal(image)` -> tıklanan görsel `selectedImage` state'ine yazılır.
  - `closeModal()` -> `selectedImage` temizlenir ve modal kapanır.
  - `ImageModal` props: `isOpen`, `image`, `onClose`.

- Render sorumluluklarını ayırdık:
  - `SearchBar`: arama başlatır (`onSubmit`).
  - `ImageGallery`: görselleri listeler, tıklanan görseli üst bileşene bildirir (`onSelectImage`).
  - `Loader`: veri yüklenirken görünür.
  - `ErrorMessage`: hata varsa görünür.
  - `LoadMoreBtn`: daha fazla sayfa varsa görünür ve `onClick` ile sayfayı artırır.

### Mimari Sonuç

`App.jsx`, bu ödevde container/orchestrator rolünü üstlenir: state'i yönetir, API akışını kontrol eder ve child component'lere yalnızca ihtiyaç duydukları veriyi/handler'ı prop olarak dağıtır.

### Adım 6 - SearchBar component tamamlandı

- **Ne yapıyoruz?** `SearchBar` içinde input state, submit handler ve boş arama kontrolünü (`react-hot-toast`) kurduk.
- **Neden yapıyoruz?** Arama akışının başlangıç noktasını güvenli hale getirmek ve boş aramada gereksiz API çağrısını engellemek için.
- **Nerede yapıyoruz?** `src/components/SearchBar/SearchBar.jsx` ve `src/components/SearchBar/SearchBar.module.css`.
- **Kontrol noktası:** Boş submitte toast görünmeli; dolu submitte `onSubmit(query)` çalışmalı.

### Adım 7 - ImageGallery + ImageCard bağlantısı

- **Ne yapıyoruz?** `ImageGallery` içinde `images.map` ile liste render edip her öğede `ImageCard` kullandık. Kart tıklamasını `onSelectImage(image)` ile üst bileşene taşıdık.
- **Neden yapıyoruz?** Galeri-list ve kart-sunum sorumluluklarını ayırmak, modal açma akışını netleştirmek için.
- **Nerede yapıyoruz?**
  - `src/components/ImageGallery/ImageGallery.jsx`
  - `src/components/ImageGallery/ImageCard/ImageCard.jsx`
- **Kontrol noktası:** Kart tıklanınca `App` içindeki `openModal` tetiklenmeli.

### Adım 8 - App import yolları düzeltmesi

- **Ne yapıyoruz?** `App.jsx` içindeki component importlarını klasör yerine gerçek dosya yollarına çevirdik.
- **Neden yapıyoruz?** `index.js` olmadığı için klasör importları derleme hatası üretiyordu.
- **Nerede yapıyoruz?** `src/App.jsx` import satırları.
- **Kontrol noktası:** Import kaynaklı module-not-found hatası olmamalı.

### Gün Sonu Durumu

- `App.jsx` state/handler/useEffect/koşullu render/modale prop akışı doğru durumda.
- `SearchBar`, `ImageGallery`, `ImageCard` temel akışları yazıldı.
- **Yarın ilk iş:** `ImageModal.jsx` tamamlanacak (`react-modal`, ESC + overlay close, `urls.regular`, `author/likes/description` fallback).
- Sonrasında `Loader`, `LoadMoreBtn`, `ErrorMessage` içerikleri tamamlanacak ve final kontrol yapılacak.
