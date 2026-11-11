# Kampüs Etkinlik - Backend API

Bu proje, Node.js ve Express kullanılarak geliştirilmiş bir Event Management (Etkinlik Yönetimi) API servisidir.

## Çalıştırma Komutları

Bağımlılıkları yüklemek ve projeyi başlatmak için backend klasörü içinde şu komutları çalıştırın:

npm install
npm run dev

## Environment Variables (.env)

Projenin çalışması için 'backend' klasörü içinde '.env' dosyası bulunmalıdır .

env
PORT=3000

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | /events | Listeyi getir | 200 | — | Bu sprint |
| **GET** | /events/:id | Tek etkinlik| 200 | 404 | Bu sprint |
| **POST** | /events | Yeni etkinlik  | 201 | 400 | Bu sprint |
| **PATCH** | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| **DELETE** | /events/:id | Sil | 204 | 404 | Sprint 9 |