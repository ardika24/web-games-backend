# Web Games Backend Chapter 10

## Note

- bash path `/api/v1`

## Setup for development

- Fork repository ini. Ada tombol 'fork' di kanan atas.
- clone repo `git clone https://github.com/{username_kalian}/web-games-backend.git`
- Pindah ke folder repository yang sudah di clone dengan command `cd web-games-backend`.
- instal dependencies `npm install`.
- duplikat file `.env.example` lalu rename menjadi `.env`
- sesuaikan isi file `.env` dengan database masing masing.
- create database `npm run db:create`
- jalankan migration `npm run db:migrate`
- jalankan seeder `npm run db:seed`
- jalankan aplikasi `npm run dev`

## Available Script

- `npm run dev` to run app with env development
- `npm run db:migrate` to migrate db for env development
- `npm run db:undo:migrate` to undo migration for env development
- `npm run db:seed` to seed db for env development
