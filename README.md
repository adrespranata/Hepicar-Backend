# Hepicar-Backend

# Dokumentasi Tugas

Ini adalah dokumentasi untuk test Full Stack Developer aplikasi "services" yang mencakup berbagai aspek seperti penggunaan, instalasi, rute, endpoint, dan penjelasan singkat tentang aplikasi ini.

## Deskripsi Proyek

Aplikasi "Catatan" adalah sebuah aplikasi sederhana untuk mencatat dan mengelola services. Aplikasi ini memiliki beberapa fitur utama, termasuk:
- Membuat, membaca, memperbarui, dan menghapus services.
- Endpoint API RESTful untuk operasi CRUD.
## Instalasi

Pastikan Anda memiliki Node.js dan npm terinstal di komputer Anda sebelum memulai.

1. Clone repositori ini:
    
    ```bash
    git clone https://github.com/adrespranata/Hepicar-Backend.git
    ```
2. Pindah ke direktori proyek:
    ```bash
    cd nama-proyek
    ```
3. Instal dependensi:
    ```bash
    npm install
    ```
4. Copy file `.env.example` menjadi file `.env` untuk konfigurasi koneksi antara database dan mengganti port.
5. Sesuaikan environment
    ```
    PORT = xxxx

    DB_HOST = xxxx
    DB_USERNAME = xxxx
    DB_PASSWORD = xxxx
    DB_NAME = xxxx
    ```
6. Jalankan perintah `npm start` untuk menjalankan aplikasi.
    ```bash
    npm start
    ```
7. Jalankan perintah `npm test` untuk menjalankan test aplikasi.
    ```bash
    npm start
    ```
## Dokumentasi Postman

Dokumentasi Postman untuk API aplikasi Catatan dapat ditemukan di sini: [Dokumentasi Postman](https://documenter.getpostman.com/view/29804014/2s9YJc1NpF)

## End Point API

Berikut adalah beberapa endpoint API yang tersedia:

- `GET /services`: Mendapatkan semua layanan.
- `POST /services`: Membuat layanan baru.
- `PUT /services/:id`: Mengupdate layanan berdasarkan ID.
- `DELETE /services/:id`: Menghapus layanan berdasarkan ID.

Pastikan untuk menyesuaikan endpoint dan permintaan sesuai dengan kebutuhan proyek Anda.


