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

### 5. Adim: Header Butonlarini Auth Modal Icin Hazirlama

#### Bu adimda ne yaptik?

`App` icinde auth modal state'i kuruldu. `Header` componenti `onLoginClick` ve `onRegisterClick` prop'lari alacak sekilde guncellendi.

#### Neden bunu yaptik?

Teknik sartnameye gore Login ve Registration route ile degil modal ile acilmaliydi. Bunun ilk baglantisi App-Header arasinda kuruldu.

#### Degisen dosyalar

- `src/app/App.tsx`
- `src/components/Header/Header.tsx`

#### Sonuc

- Login butonu `login` modal tipini tetikliyor.
- Registration butonu `register` modal tipini tetikliyor.
- Header link yapisi bozulmadan modal acilis zemini hazirlandi.

### 6. Adim: Modal ve AuthModal Altyapisini Kurma

#### Bu adimda ne yaptik?

Ortak `Modal` componenti kuruldu. `AuthModal` componenti ise `modalType` degerine gore Login veya Registration icerigini gosterecek sekilde hazirlandi.

#### Neden bunu yaptik?

Projede birden fazla modal kullanilacagi icin ortak kutu mantiginin ayri tutulmasi gerekiyordu. AuthModal ise bu ortak yapinin auth senaryosuna uygulanmis hali oldu.

#### Degisen dosyalar

- `src/components/Modal/Modal.tsx`
- `src/components/Modal/Modal.module.css`
- `src/components/AuthModal/AuthModal.tsx`
- `src/components/AuthModal/AuthModal.module.css`
- `src/app/App.tsx`

#### Sonuc

- Modal backdrop ile aciliyor.
- `Esc` ile kapanma calisiyor.
- Backdrop tiklandiginda modal kapaniyor.
- X butonu ile kapanma calisiyor.
- Login ve Registration modal baslik/aciklama alanlari figmaya yakin sekilde yerlestirildi.

### 7. Adim: Login ve Register Form Iskeletini Kurma

#### Bu adimda ne yaptik?

`LoginForm` ve `RegisterForm` componentleri olusturuldu. Inputlar, butonlar, eye-off iconu ve temel CSS module stilleri kuruldu.

#### Neden bunu yaptik?

Auth modalin sadece gorunmesi yetmezdi; kullanicidan veri alacak form alanlarinin da hazirlanmasi gerekiyordu.

#### Degisen dosyalar

- `src/components/LoginForm/LoginForm.tsx`
- `src/components/LoginForm/LoginForm.module.css`
- `src/components/RegisterForm/RegisterForm.tsx`
- `src/components/RegisterForm/RegisterForm.module.css`
- `src/assets/close-icon.svg`
- `src/assets/eye-off-icon.svg`

#### Sonuc

- Login formunda email ve password alanlari kuruldu.
- Register formunda name, email ve password alanlari kuruldu.
- Button ve icon yerlesimleri figmaya yaklastirildi.
- Formlar `AuthModal` icinde dogru kosullarla render edilmeye basladi.

### 8. Adim: react-hook-form ve yup Validasyonunu Baglama

#### Bu adimda ne yaptik?

Her iki formda `useForm` kuruldu. `validationSchemas.ts` icinde login ve register icin yup schemalari yazildi ve `yupResolver` ile formlara baglandi. Hata mesajlari ekrana yazdirildi.

#### Neden bunu yaptik?

Formlarin sadece gorunmesi degil, kurallara gore veri dogrulamasi da yapmasi gerekiyordu. Bu adim Firebase baglantisindan once form mantigini guvenli hale getirdi.

#### Degisen dosyalar

- `src/components/LoginForm/LoginForm.tsx`
- `src/components/RegisterForm/RegisterForm.tsx`
- `src/components/LoginForm/LoginForm.module.css`
- `src/components/RegisterForm/RegisterForm.module.css`
- `src/utils/validationSchemas.ts`

#### Sonuc

- Login formu `react-hook-form` ile calisiyor.
- Register formu `react-hook-form` ile calisiyor.
- Login schema: email format ve password min karakter kuralina sahip.
- Register schema: name, email ve password kurallariyla calisiyor.
- Hata mesajlari component icinde gosterilmeye baslandi.

### 9. Adim: Firebase Auth Fonksiyonlarini Baglama

#### Bu adimda ne yaptik?

`firebase/auth.ts` icinde register, login ve logout fonksiyonlari yazildi. Ardindan `LoginForm` ve `RegisterForm` submitlerinde bu fonksiyonlar baglandi.

#### Neden bunu yaptik?

Formlarin sadece UI ve validasyon icermesi yetmiyordu; teknik sartname geregi gercek authentication davranisinin da calismasi gerekiyordu.

#### Degisen dosyalar

- `src/firebase/auth.ts`
- `src/components/LoginForm/LoginForm.tsx`
- `src/components/RegisterForm/RegisterForm.tsx`

#### Sonuc

- Email ve password ile login calisiyor.
- Name, email ve password ile register calisiyor.
- Register sonrasi `displayName` guncelleniyor.
- Auth hata durumlari form icinde mesaj olarak gosteriliyor.

### 10. Adim: Auth State ve Header Logout Davranisi

#### Bu adimda ne yaptik?

`useAuth` hook'u ile mevcut kullanici takibi baglandi. `App` icinde auth state kullanildi ve `Header` logout davranisi ile guncellendi.

#### Neden bunu yaptik?

Teknik sartnameye gore uygulama yenilendiginde mevcut kullanici durumunun korunmasi ve yetkili/yetkisiz gorunumin dogru yonetilmesi gerekiyordu.

#### Degisen dosyalar

- `src/hooks/useAuth.ts`
- `src/app/App.tsx`
- `src/components/Header/Header.tsx`

#### Sonuc

- Firebase auth state degisimi dinleniyor.
- Kullanici giris yaptiysa logout butonu gosteriliyor.
- Kullanici yoksa login ve registration butonlari gosteriliyor.

### 11. Adim: Home Page Hero Tasarimi ve CTA Gecisi

#### Bu adimda ne yaptik?

Home page'in hero alani, istatistik bandi ve gorsel yerlesimi Figma referansina gore kuruldu. `Get Started` alani `Teachers` sayfasina yonlendirecek sekilde baglandi.

#### Neden bunu yaptik?

Home sayfasi teknik sartnameye gore uygulamanin giris noktasi ve kullaniciyi `Teachers` sayfasina tasiyan ana CTA alanidir.

#### Degisen dosyalar

- `src/pages/HomePage/HomePage.tsx`
- `src/pages/HomePage/HomePage.module.css`
- `src/assets/home-icon.svg`
- `src/assets/iMac-icon.svg`

#### Sonuc

- Hero alani tasarlandi.
- Stats bandi eklendi.
- `Get Started` davranisi `Link` ile `/teachers` sayfasina baglandi.

### 12. Adim: Teachers Page Iskeleti ve Local JSON ile Listeleme

#### Bu adimda ne yaptik?

`TeachersPage` icin temel iskelet kuruldu. `teachers.json` verisi sayfaya baglandi ve ogretmenler local veri kaynagindan okunmaya baslandi.

#### Neden bunu yaptik?

Firebase'e gecmeden once UI ve listeleme mantigini statik veriyle dogrulamak daha guvenli ve ogrenme acisindan daha temiz bir akisti.

#### Degisen dosyalar

- `src/pages/TeachersPage/TeachersPage.tsx`
- `src/types/teacher.ts`
- `teachers.json`

#### Sonuc

- `Teacher` ve `Review` tipleri yazildi.
- `teachers.json` verisi TypeScript tipleriyle kullanilmaya baslandi.
- `TeachersPage` icinde listeleme mantigi kuruldu.

### 13. Adim: Ilk 4 Kart ve Load More Davranisi

#### Bu adimda ne yaptik?

`useState` ile gorunen kart sayisi yonetildi. Ilk acilista 4 ogretmen gosterilecek sekilde `slice` mantigi eklendi ve `Load More` ile kart sayisi 4'er artacak sekilde baglandi.

#### Neden bunu yaptik?

Teknik sartnameye gore `Teachers` sayfasinda ilk durumda 4 kart gorunmeli ve kalan kartlar `Load More` ile eklenmelidir.

#### Degisen dosyalar

- `src/pages/TeachersPage/TeachersPage.tsx`

#### Sonuc

- Ilk acilista 4 kart gorunuyor.
- `Load More` butonu kart sayisini artiriyor.
- Tum kartlar gorundugunde buton gizleniyor.

### 14. Adim: TeacherCard Component Ayrimi

#### Bu adimda ne yaptik?

Tek ogretmen karti yapisi `TeachersPage` icinden ayrilarak `TeacherCard` componentine tasinmaya baslandi. Avatar ve icerik wrapper mantigi kuruldu.

#### Neden bunu yaptik?

Sayfa componentinin veri ve liste davranisini yonetmesi, tek kart componentinin ise sadece gorunumu cizmesi React acisindan daha dogru bir sorumluluk ayrimidir.

#### Degisen dosyalar

- `src/components/TeacherCard/TeacherCard.tsx`
- `src/components/TeacherCard/TeacherCard.module.css`
- `src/pages/TeachersPage/TeachersPage.tsx`

#### Sonuc

- `TeacherCard` tek ogretmeni prop ile alacak sekilde kuruldu.
- `TeachersPage` ile `TeacherCard` arasinda parent-child veri akisi olusturuldu.
- Kartlar arasi bosluk parent seviyesinde dusunulmeye baslandi.
- Kartin temel layout'u kuruldu, fakat Figma'ya uygun detayli stil henuz tamamlanmadi.

## Kalanlar

### Sonraki Kalan Adimlar

#### 1. TeacherCard Tasarimini Tamamlama

- `src/components/TeacherCard/TeacherCard.tsx`
- `src/components/TeacherCard/TeacherCard.module.css`

Yapilacaklar:

- Figma'ya uygun kart ic layout'unu tamamlama
- Top row, meta bilgiler, level pill'leri ve pricing alanini ekleme
- Avatar ve icerik alaninin spacing ve alignment'ini duzeltme

#### 2. Filters

- `src/components/Filters/Filters.tsx`
- `src/components/Filters/Filters.module.css`
- `src/pages/TeachersPage/TeachersPage.tsx`

Yapilacaklar:

- Ogretim dili filtresi
- Seviye filtresi
- Saatlik ucret filtresi
- Teachers listesine filtreleri uygulamak

#### 3. Firebase Realtime Database

- `src/firebase/firebase.ts`
- `src/firebase/teachers.ts`
- `src/hooks/useTeachers.ts`

Yapilacaklar:

- Firebase config kontrolu
- Teachers verisini Realtime Database'den alma
- Local JSON mantigini Firebase veri akisina tasima

#### 4. Teachers Page Liste Durumlari

- `src/pages/TeachersPage/TeachersPage.tsx`
- `src/pages/TeachersPage/TeachersPage.module.css`
- `src/components/TeacherList/TeacherList.tsx`
- `src/components/TeacherList/TeacherList.module.css`

Yapilacaklar:

- Liste bos/yukleniyor durumlarini yonetmek
- `TeacherList` componenti gerekip gerekmedigini netlestirmek
- Load more mantigini Firebase istegiyle baglamak

#### 5. TeacherCard Davranislari

- `src/components/TeacherCard/TeacherCard.tsx`
- `src/components/TeacherCard/TeacherCard.module.css`

Yapilacaklar:

- Read more ile detaylari acmak
- Reviews gostermek
- Book trial lesson butonunu eklemek
- Favori kalp butonunu eklemek

#### 6. Trial Lesson Modal

- `src/components/TrialLessonModal/TrialLessonModal.tsx`
- `src/components/TrialLessonModal/TrialLessonModal.module.css`
- `src/utils/validationSchemas.ts`

Yapilacaklar:

- Book trial lesson formu
- react-hook-form ve yup validasyonu
- Submit sonrasi basarili mesaj
- Gereksiz backend kaydi eklememek

#### 7. Favorites Mantigi

- `src/hooks/useFavorites.ts`
- `src/pages/FavoritesPage/FavoritesPage.tsx`
- `src/components/TeacherCard/TeacherCard.tsx`

Yapilacaklar:

- Yetkisiz kullanici kalbe tiklarsa bilgilendirme
- Yetkili kullanici favori ekleyip kaldirabilmeli
- Kalp rengi degismeli
- Sayfa yenilenince favori durumu korunmali
- localStorage veya Firebase yontemi kullaniciyla birlikte secilmeli

#### 8. Protected Favorites Route

- `src/app/App.tsx`
- `src/hooks/useAuth.ts`
- `src/pages/FavoritesPage/FavoritesPage.tsx`

Yapilacaklar:

- Yetkisiz kullanici `/favorites` sayfasina giderse uygun sekilde yonlendirmek veya bilgilendirmek

#### 9. README

- `README.md`

Yapilacaklar:

- Proje konusu
- Kullanilan teknolojiler
- Teknik sartname ozeti
- Maket bilgisi
- Deploy linki

#### 10. Final Kontroller

Yapilacaklar:

- `npm run build`
- Konsol hata kontrolu
- Desktop tasarim kontrolu
- Route kontrolu
- Modal kapanma kontrolleri
- Vercel deploy kontrolu

## Bir Sonraki Oturumda Baslanacak Yer

Bir sonraki oturumda su adimdan devam edilecek:

**TeacherCard tasarimini Figma'ya yaklastirma**

Once `src/components/TeacherCard/TeacherCard.tsx` ve `src/components/TeacherCard/TeacherCard.module.css` uzerinden avatar alani, content alani, ust bilgi satiri ve metin akisi duzeltilecek. Ardindan filters alani ve tam kart bilgileri adim adim eklenecek.
