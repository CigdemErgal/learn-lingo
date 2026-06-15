# LearnLingo

LearnLingo, online dil ogrenimi hizmeti sunan bir platformun frontend uygulamasidir. Proje React ogrenme odakli ilerletilmektedir ve teknik sartnameye gore adim adim gelistirilmektedir.

## Proje Konusu

Uygulama 3 ana sayfadan olusur:

- `Home` sayfasi: platformun avantajlarini tanitir ve kullaniciyi `Teachers` sayfasina yonlendirir.
- `Teachers` sayfasi: ogretmen listesi, filtreleme ve `Load more` davranisini icerir.
- `Favorites` sayfasi: kullanicinin favorilere ekledigi ogretmenleri gosterir.

## Kullanilan Teknolojiler

- React
- TypeScript
- Vite
- React Router DOM
- CSS Modules
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup

## Mevcut Durum

Tamamlanan temel kisimlar:

- Router yapisi kuruldu.
- Header ve auth modal altyapisi kuruldu.
- Login ve register formlari olusturuldu.
- Form validasyonlari `react-hook-form` ve `yup` ile baglandi.
- Home page hero alani ve `Get Started` ile `Teachers` sayfasina gecis kuruldu.
- `teachers.json` verisi projeye baglandi.
- `Teachers` sayfasinda ilk `4` karti gosterme ve `Load more` mantigi baslatildi.
- `TeacherCard` component ayrimi baslatildi.

Devam eden kisimlar:

- Teachers kartinin Figma'ya uygun tam layout'u
- Filters alani
- Favorites mantigi
- Read more davranisi
- Book trial lesson modali
- Firebase Realtime Database entegrasyonu

## Teknik Sartname Ozeti

Projede tamamlanmasi hedeflenen ana davranislar:

- Firebase ile kayit, giris, cikis ve mevcut kullanici takibi
- Sadece yetkili kullanicilar icin favorites davranisi
- Ogretmenleri dil, seviye ve fiyat bazinda filtreleme
- Ilk acilista 4 kart gosterme
- `Load more` ile yeni kartlar getirme
- `Read more` ile kart detaylarini acma
- `Book trial lesson` ile modal form acma
- Favorites sayfasinda secilen ogretmenleri listeleme

## Klasor Mantigi

- `src/app`: uygulama seviyesi bilesenler
- `src/pages`: route bazli sayfalar
- `src/components`: tekrar kullanilan UI bilesenleri
- `src/hooks`: ozel hook'lar
- `src/firebase`: auth ve database islemleri
- `src/types`: TypeScript tip tanimlari
- `src/styles`: global stiller ve degiskenler

## Tasarim

Arayuz, Figma tasarimi referans alinarak gelistirilmektedir. Ozellikle:

- Home hero alani
- Teachers filtre alani
- Teacher card yerlesimi
- Favorites sayfasi

tasarima yakin olacak sekilde uygulanmaktadir.

## Calistirma

Projeyi lokal ortamda calistirmak icin:

```bash
npm install
npm run dev
```

Build almak icin:

```bash
npm run build
```

## Notlar

- Proje mentor odakli bir ogrenme sureciyle ilerletilmektedir.
- Kod yapisinda parent-child layout mantigi ve component sorumluluk ayrimi ozellikle korunmaktadir.
- Teknik sartname disinda gereksiz ekstra ozellik eklenmemektedir.

## Deploy

Deploy linki proje tamamlandiginda eklenecektir.
