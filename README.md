# Treasure park

An online platform for sharing and managing collections.

Live link - [https://treasure-park.onrender.com/](https://treasure-park.onrender.com/)

## Overview

**Treasure park** is a web application designed for collectors to create, edit, and share their collections.

## Features

- User authentication and authorization
- Create collections with customizable fields
- Attach images to collection items
- Leave likes and comments on others' postings
- Live updates in the comments section
- Home page with popular collections, tag cloud, and latest posts
- Search with sorting and filtering
- Responsive design for mobile and desktop
- Two UI themes: dark and light

## Getting started

### Installation

1. Clone the repository.
2. `npm install` the backend folder.
3. `npm install` the frontend folder.

### Development

Starting the backend dev server:
```
cd backend
npm run dev
```

Starting the frontend dev server:
```
cd frontend
npm run dev
```

### Build and start the app
```
npm run build
npm start
```

## Technologies used

Database: 
- MySQL hosted on [Planetscale](https://planetscale.com/)

Backend:
- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [zod](https://zod.dev/)

Frontend:
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MUI](https://mui.com/)
- [Firebase cloud storage](https://firebase.google.com/)
- [React Router](https://reactrouter.com/en/main)
- [TanStack Query](https://tanstack.com/query/latest)
- [Dayjs](https://day.js.org/)
- [zod](https://zod.dev/)

Hosting:
- [render.com](https://render.com/)
