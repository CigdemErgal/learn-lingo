# LearnLingo

LearnLingo, online dil ogrenimi hizmeti sunan bir platform icin gelistirilmis React tabanli bir web uygulamasidir. Proje, teknik sartnamedeki 3 ana sayfayi, kullanici yetkilendirmesini, ogretmen listeleme/filterleme akisini, favori mantigini ve deneme dersi rezervasyon modalini kapsar.

## Proje Konusu

Uygulama su sayfalardan olusur:

- `Home` sayfasi: platformun avantajlarini tanitir ve kullaniciyi `Teachers` sayfasina yonlendirir.
- `Teachers` sayfasi: ogretmenlerin listelendigi, filtreleme, favorileme, `Read more` ve `Book trial lesson` akislarinin bulundugu sayfadir.
- `Favorites` sayfasi: kullanicinin favorilere ekledigi ogretmenleri ayni kart tasarimi ile listeler.

## Teknik Yigin

- React
- TypeScript
- Vite
- React Router DOM
- CSS Modules
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup

## Uygulanan Teknik Sartname Maddeleri

- `Home`, `Teachers` ve `Favorites` sayfa yapisi kuruldu.
- React Router ile route yapisi olusturuldu.
- Firebase Authentication ile `register`, `login`, `logout` ve mevcut kullanici takibi baglandi.
- Login ve register formlari `react-hook-form` ve `yup` ile dogrulandi.
- Modal yapisi `Esc`, backdrop tiklamasi ve kapatma butonu ile calisacak sekilde kuruldu.
- Realtime Database icin `teachers` veri kaynagi olusturuldu ve uygulama bu veriyi servis katmani uzerinden okur hale getirildi.
- `Teachers` sayfasinda dil, seviye ve fiyat bazli filtreleme eklendi.
- Ogretmen kartlari Figma yapisina uygun sekilde olusturuldu.
- Ilk asamada 4 kart gorunur, `Load more` ile yeni veri istegi atilarak liste genisletilir.
- Kalp butonu ile favorilere ekleme ve favoriden cikarma calisir.
- Yetkisiz kullanici kalp butonuna bastiginda login akisina yonlendirilir.
- Sayfa yenilendiginde favori durumu korunur.
- `Read more` ile ogretmen karti genisler ve deneyim/yorum alanlari gorunur.
- `Book trial lesson` butonu ile ayri modal acilir.
- Trial lesson formu `react-hook-form` ve `yup` ile dogrulanir.
- `Favorites` sayfasi sadece yetkili kullanici icin route seviyesinde korunur.

## Uygulama Ozellikleri

### Kimlik Dogrulama

- Email ve sifre ile kayit olma
- Email ve sifre ile giris yapma
- Oturum kapatma
- Firebase auth state ile mevcut kullaniciyi takip etme

### Teachers

- Ogretmenleri listeleme
- Fiyat, dil ve seviye bazli filtreleme
- `Load more` ile daha fazla kayit gosterme
- `Read more / Read less` ile detay acma-kapatma
- Ogretmen yorumlarini gosterme
- `Book trial lesson` modalini acma

### Favorites

- Ogretmeni favorilere ekleme
- Favoriden cikarma
- Favorileri kullanici bazli saklama
- Local favorileri giris yapan kullanicinin Firebase favorileri ile birlestirme
- Yetkisiz kullanicinin `Favorites` sayfasina erisimini engelleme

## Firebase Yapisi

Projede 2 temel Firebase alani kullanilir:

- `Authentication`
  - kullanici kaydi ve giris islemleri icin
- `Realtime Database`
  - `teachers`
  - `users/{userId}/favorites`

## Veri Akisi

- Ogretmenler `teachers.json` dosyasindan hazirlandi.
- `seed:teachers` komutu ile Realtime Database altindaki `teachers` alanina yuklenir.
- Uygulama ogretmen verisini `src/firebase/teachers.ts` servis katmani uzerinden okur.
- Favoriler `src/firebase/favorites.ts` uzerinden kullanici bazli saklanir.

## Proje Yapisi

- `src/app` : uygulama seviyesinde route ve genel iskelet
- `src/pages` : sayfa componentleri
- `src/components` : tekrar kullanilan UI bilesenleri
- `src/firebase` : auth, favorites ve teacher veri servisleri
- `src/hooks` : ozel hooklar
- `src/types` : TypeScript tipleri
- `src/utils` : validation schema ve yardimci yapilar
- `scripts` : bir kerelik veri yukleme scriptleri

## Kurulum

1. Bagimliliklari yukleyin:

```bash
npm install
```

2. `.env.example` dosyasini referans alarak `.env` olusturun.

Gerekli degiskenler:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
FIREBASE_SEED_EMAIL=
FIREBASE_SEED_PASSWORD=
```

Not:

- `FIREBASE_SEED_EMAIL` ve `FIREBASE_SEED_PASSWORD` sadece gerekliyse seed scripti icin kullanilir.
- Realtime Database test mode'da ise seed scripti bu bilgiler olmadan da calisabilir.

## Gelistirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Type Check

```bash
npx tsc --noEmit -p tsconfig.app.json
```

## Teacher Verisini Firebase'e Yukleme

`teachers.json` verisini Realtime Database icindeki `teachers` alanina yuklemek icin:

```bash
npm run seed:teachers
```

Bu komut:

- `.env` bilgilerini okur
- `teachers.json` dosyasini acar
- veriyi Realtime Database altindaki `teachers` path'ine yazar

## Tasarim

Arayuz, verilen Figma tasarimi referans alinarak gelistirildi. Ozellikle su alanlarda tasarima sadik kalinmaya calisildi:

- teachers filtre satiri
- teacher card yerlesimi
- expanded card yapisi
- trial lesson modal
- favorites sayfasi

## Mevcut Durum

Proje su anda calisir durumdadir:

- auth akisleri calisiyor
- realtime database teacher verisi baglandi
- favori akisi calisiyor
- trial lesson modal ve form dogrulamasi calisiyor
- typescript kontrolu temiz

## Kalanlar

Teslim oncesi istege bagli son adimlar:

- deploy linkini README'ye eklemek
- isterse Firebase rules tarafini production icin sikilastirmak
- son UI/UX polish kontrollerini tamamlamak
