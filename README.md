This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Techstack
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)  
![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white) 

| Teknologi                           | Kegunaan                              |
| ----------------------------------- | ------------------------------------- |
| **Next.js**                         | Framework React untuk SSR dan routing |
| **React**                           | Library UI utama                      |
| **Zustand**                         | State management global ringan        |
| **Tailwind CSS**                    | Styling responsive dan modern         |
| **JavaScript**                      | Bahasa pemrograman utama              |

# 📂 CRUD Flow (Request / Tracker)
Read → Tampilkan di table / list.
Create → Form input → simpan ke store atau API.
Update → Klik edit → update store / API.
Delete → Klik delete → hapus dari store / API.

# ⚡ Struktur Project
src/
 └─ app/
     ├─ login/
     ├─ master/
     │    ├─ tracker/
     │    │    ├─ [id]/
     │    │    │   └─ page.jsx
     │    │    ├─ create/
     │    │    │   └─ page.jsx
     │    │    └─ page.jsx
     │    └─ request/
     │         └─ ca   (mungkin belum selesai)
 └─ tracker/
      ├─ [id]/page.jsx
      ├─ create/page.jsx
      └─ page.jsx
components/
 ├─ Card.jsx
 ├─ Icons.jsx
 ├─ Navbar.jsx
 ├─ Sidebar.jsx
 └─ TableRequest.jsx
globals.css
layout.jsx
not-found.jsx
page.jsx


# Auth
## Login
![alt text](image.png)
- Login berjalan dengan lancar menggunakan :
    - username : fe.it.pml
    - password : Password123?
### Error Login
- kendala login sebagai berikut :
    1. ketika password salah server masih merespon dengan 200 OK
    2. ketika token access telah habis, endpoint /token/refresh akan mengembalikan 401 jika menggunakan token refresh yang didapat dari login, akan tetapi jika menggunakan token access yang masih aktif, endpoint tersebut mengembalikan token yang baru.
    
## Logout
![alt text](image-1.png)
- Logout bisa digunakan untuk keluar dari akun yang sudah login, berjalan dengan baik tanpa kendala


# TRACKER & REQUEST PAGE
- page Tracker $ Request Memiliki fungsi dan Kendala yang sama, dimana fitur dan kendalanya sebagai berikut :

![alt text](image-2.png)
![alt text](image-3.png)
## Create
![alt text](image-4.png)
![alt text](image-5.png)
- Create berjalan dengan baik, hanya saja kadang butuh waktu yang lama untuk data baru bisa masuk ke database dan ditampilkan kembali

## Read
![alt text](image-2.png)
- Read bisa menampilkan semua data 
### Error Read
- Icon tidak bisa ditampilkan karena tidak ada keterangan implementasi string yang dikembalikan server, seperti nama library atau element

### Update
![alt text](image-6.png)
![alt text](image-7.png)
- Update dapat berjalan dengan baik

### Delete
![alt text](image-8.png)
![alt text](image-9.png)
- Delete dapat berjalan dengan baik

## Error Tracker & Request Page
- error ada di pagination dan search, begitu juga dengan semua pagination di endpoint lain, semua terkendala di pagination , search, limit, dll
![alt text](image-10.png)


# Tracking Page
![alt text](image-11.png)
- Tracking Page bisa menampilkan data dengan baik, akan tetapi
### Error Tracking Page
![alt text](image-12.png)
- Semua Fitur selain GET dan GETbyID semuanya error termasuk POST,PUT dan DELETE

