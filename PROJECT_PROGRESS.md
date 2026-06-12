# LearnLingo Proje Ilerleme Notlari

Bu dosya, projeyi teknik sartnameye gore adim adim takip etmek icin olusturuldu. Amac, bitenleri ve kalanlari net gormek; her yeni oturumda kaldigimiz yerden devam etmek.

## Genel Kural

-proje mentor modunda yapılacak.

- Proje tek seferde bitirilmeyecek.
- Her buyuk adimdan once ne yapilacagi aciklanacak.
- Teknik sartnamede istenmeyen ekstra ozellik eklenmeyecek.
- CSS Modules kullanilacak.
- Component stilleri component klasorundeki `ComponentName.module.css` dosyasinda tutulacak.
- Login, Registration ve Book trial lesson icin route olusturulmayacak; modal kullanilacak.
- Kod icinde yorum satiri kullanilmayacak.
- Her ana adimdan sonra tarayici konsolu ve build kontrol edilecek.

## Bitenler

### 1. Adim: Proje Kontrolu

#### Bu adimda ne yaptik?

Mevcut proje yapisi, kurulu paketler, route yapisi ve Header dosyalari kontrol edildi.

#### Neden bunu yaptik?

Projeye teknik sartnameye uygun devam edebilmek icin once mevcut durumun dogru anlasilmasi gerekiyordu.

#### Kontrol edilen dosyalar

- `package.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/app/App.tsx`
- `src/components/Header/Header.tsx`
- `src/components/Header/Header.module.css`
- `src/pages/HomePage/HomePage.tsx`
- `src/pages/TeachersPage/TeachersPage.tsx`
- `src/pages/FavoritesPage/FavoritesPage.tsx`
- `src/styles/global.css`

#### Sonuc

- Gerekli paketlerin kurulu oldugu goruldu.
- Route yapisinin teknik sartnameyle uyumlu oldugu goruldu:
  - `/`
  - `/teachers`
  - `/favorites`
- Login ve Registration icin route olmadigi goruldu; bu dogru yaklasim.
- AuthModal, Modal, LoginForm ve RegisterForm dosyalarinin henuz bos oldugu goruldu.

### 2. Adim: App Dosyasini Dogru Konuma Tasima

#### Bu adimda ne yaptik?

Aktif App yapisi `src/app/App.tsx` icine tasindi ve `src/main.tsx` importu guncellendi.

#### Neden bunu yaptik?

Prompttaki onerilen klasor yapisinda App dosyasi `src/app/App.tsx` icinde yer almaliydi.

#### Degisen dosyalar

- `src/main.tsx`
- `src/app/App.tsx`

#### Uygulanan mantik

`src/main.tsx` icinde App importu su hale getirildi:

```tsx
import App from "./app/App";
```

`src/app/App.tsx` icindeki import yollarinda bir seviye yukari cikildi:

```tsx
import Header from "../components/Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
```

#### Kontrol

`npm run build` calistirildi ve basarili oldu.

### 3. Adim: Header SVG Import Hatasini Duzeltme

#### Bu adimda ne yaptik?

Header icindeki login icon import yolu duzeltildi.

#### Neden bunu yaptik?

`Header.tsx`, `src/components/Header/` klasorunde oldugu icin `./src/assets/login-icon.svg` yolu yanlisti. Bu yol dosyayi `src/components/Header/src/assets/` altinda aramaya calisiyordu.

#### Degisen dosyalar

- `src/components/Header/Header.tsx`
- `src/components/Header/Header.module.css`

#### Uygulanan mantik

Yanlis import:

```tsx
import loginIcon from "./src/assets/login-icon.svg";
```

Dogru import:

```tsx
import loginIcon from "../../assets/login-icon.svg";
```

Login butonunda ikon ve yazi yan yana hizalansin diye `.loginButton` icin flex duzeni eklendi.

#### Kontrol

`npm run build` calistirildi ve basarili oldu.

### 4. Adim: App Module CSS Hazirligi

#### Bu adimda ne yaptik?

`src/app/App.module.css` dosyasinin App seviyesinde kullanilabilecegi netlestirildi.

#### Neden bunu yapiyoruz?

App seviyesindeki CSS sadece genel uygulama kabini yonetmek icin kullanilmali. Component detay stilleri kendi module css dosyalarinda kalmali.

#### Onerilen kullanim

`src/app/App.tsx` icinde:

```tsx
import css from "./App.module.css";
```

Return icinde:

```tsx
<div className={css.app}>
  <Header />
  <Routes>...</Routes>
</div>
```

`src/app/App.module.css` icinde:

```css
.app {
  min-height: 100vh;
}
```

## Kalanlar

### Siradaki Adim: Header Butonlarini Auth Modal Icin Hazirlama

#### Bu adimda ne yapacagiz?

Header icindeki `Login` ve `Registration` butonlarina click davranisi ekleyecegiz. Butonlar route'a gitmeyecek; App icindeki modal state'i tetikleyecek.

#### Neden bunu yapacagiz?

Teknik sartnameye gore Login ve Registration ayri sayfa degil, modal olarak acilmali.

#### Hangi dosyalari degistirecegiz?

- `src/app/App.tsx`
- `src/components/Header/Header.tsx`

#### Planlanan kod mantigi

App icinde auth modal tipi state olarak tutulacak:

```tsx
type AuthModalType = "login" | "register" | null;
```

Header'a iki fonksiyon prop olarak verilecek:

```tsx
<Header
  onLoginClick={() => setAuthModalType("login")}
  onRegisterClick={() => setAuthModalType("register")}
/>
```

Header bu fonksiyonlari butonlarda kullanacak:

```tsx
<button type="button" onClick={onLoginClick}>
  Login
</button>
```

#### Kontrol

- Header gorunmeye devam etmeli.
- Home, Teachers, Favorites linkleri calismali.
- Login ve Registration butonlari console hatasi uretmemeli.
- Modal componenti henuz hazir degilse, sadece state hazirlanmali.

#### Onay

Bu adima baslamadan once kullanicidan onay alinacak.

### Sonraki Kalan Adimlar

#### 1. Modal Component

- `src/components/Modal/Modal.tsx`
- `src/components/Modal/Modal.module.css`

Yapilacaklar:

- Backdrop tiklayinca kapanma
- X butonu ile kapanma
- Esc tusu ile kapanma
- Console hatasi olmadan calisma

#### 2. AuthModal Component

- `src/components/AuthModal/AuthModal.tsx`
- `src/components/AuthModal/AuthModal.module.css`

Yapilacaklar:

- Login ve Registration modlarini yonetme
- LoginForm veya RegisterForm componentini gostermek
- Header butonlariyla baglanmak

#### 3. LoginForm

- `src/components/LoginForm/LoginForm.tsx`
- `src/components/LoginForm/LoginForm.module.css`
- `src/utils/validationSchemas.ts`
- `src/firebase/auth.ts`

Yapilacaklar:

- react-hook-form kullanmak
- yup ile validasyon yapmak
- Firebase Authentication ile login islemi yapmak

#### 4. RegisterForm

- `src/components/RegisterForm/RegisterForm.tsx`
- `src/components/RegisterForm/RegisterForm.module.css`
- `src/utils/validationSchemas.ts`
- `src/firebase/auth.ts`

Yapilacaklar:

- react-hook-form kullanmak
- yup ile validasyon yapmak
- Firebase Authentication ile kayit islemi yapmak

#### 5. Auth State ve Logout

- `src/hooks/useAuth.ts`
- `src/firebase/auth.ts`
- `src/components/Header/Header.tsx`

Yapilacaklar:

- Mevcut kullaniciyi takip etmek
- Kullanici giris yaptiysa Header'da logout davranisi eklemek
- Yetkisiz kullanici durumlarini kontrol etmek

#### 6. Home Page Tasarimi

- `src/pages/HomePage/HomePage.tsx`
- `src/pages/HomePage/HomePage.module.css`

Yapilacaklar:

- Hero alani
- Avantajlar listesi
- Teachers sayfasina giden CTA butonu
- Figma temasina uygun tutarli stil

#### 7. Firebase Realtime Database

- `src/firebase/firebase.ts`
- `src/firebase/teachers.ts`
- `src/hooks/useTeachers.ts`

Yapilacaklar:

- Firebase config kontrolu
- Teachers verisini Realtime Database'den alma
- Ilk 4 ogretmeni gosterecek veri akisini hazirlama

#### 8. Teachers Page ve Load More

- `src/pages/TeachersPage/TeachersPage.tsx`
- `src/pages/TeachersPage/TeachersPage.module.css`
- `src/components/TeacherList/TeacherList.tsx`
- `src/components/TeacherList/TeacherList.module.css`

Yapilacaklar:

- Ilk acilista 4 kart gostermek
- Load more ile yeni veri istemek
- Liste bos/yukleniyor durumlarini yonetmek

#### 9. TeacherCard

- `src/components/TeacherCard/TeacherCard.tsx`
- `src/components/TeacherCard/TeacherCard.module.css`

Yapilacaklar:

- Ogretmen temel bilgilerini gostermek
- Read more ile detaylari acmak
- Reviews gostermek
- Book trial lesson butonunu eklemek
- Favori kalp butonunu eklemek

#### 10. Trial Lesson Modal

- `src/components/TrialLessonModal/TrialLessonModal.tsx`
- `src/components/TrialLessonModal/TrialLessonModal.module.css`
- `src/utils/validationSchemas.ts`

Yapilacaklar:

- Book trial lesson formu
- react-hook-form ve yup validasyonu
- Submit sonrasi basarili mesaj
- Gereksiz backend kaydi eklememek

#### 11. Favorites Mantigi

- `src/hooks/useFavorites.ts`
- `src/pages/FavoritesPage/FavoritesPage.tsx`
- `src/components/TeacherCard/TeacherCard.tsx`

Yapilacaklar:

- Yetkisiz kullanici kalbe tiklarsa bilgilendirme
- Yetkili kullanici favori ekleyip kaldirabilmeli
- Kalp rengi degismeli
- Sayfa yenilenince favori durumu korunmali
- localStorage veya Firebase yontemi kullaniciyla birlikte secilmeli

#### 12. Filters

- `src/components/Filters/Filters.tsx`
- `src/components/Filters/Filters.module.css`
- `src/pages/TeachersPage/TeachersPage.tsx`

Yapilacaklar:

- Ogretim dili filtresi
- Seviye filtresi
- Saatlik ucret filtresi
- Teachers listesine filtreleri uygulamak

#### 13. Protected Favorites Route

- `src/app/App.tsx`
- `src/hooks/useAuth.ts`
- `src/pages/FavoritesPage/FavoritesPage.tsx`

Yapilacaklar:

- Yetkisiz kullanici `/favorites` sayfasina giderse uygun sekilde yonlendirmek veya bilgilendirmek

#### 14. README

- `README.md`

Yapilacaklar:

- Proje konusu
- Kullanilan teknolojiler
- Teknik sartname ozeti
- Maket bilgisi
- Deploy linki

#### 15. Final Kontroller

Yapilacaklar:

- `npm run build`
- Konsol hata kontrolu
- Desktop tasarim kontrolu
- Route kontrolu
- Modal kapanma kontrolleri
- Vercel deploy kontrolu

## Bir Sonraki Oturumda Baslanacak Yer

Bir sonraki oturumda su adimdan devam edilecek:

**Header butonlarini Auth Modal icin hazirlama**

Once kisa aciklama yapilacak, sonra kullanicidan onay alinacak. Onaydan sonra sadece `src/app/App.tsx` ve `src/components/Header/Header.tsx` uzerinde kucuk bir state/prop baglantisi kurulacak.
