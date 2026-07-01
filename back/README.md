## Backend Documentation (for myself)

This file is for me so that whenever I come back to the project, I can quickly remember how the backend is structured and how things work.

---

## Overview

The backend is a **RESTful API** built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It handles users, products, orders, comments, categories, navbar items, file uploads and authentication/authorization.

Authentication is done with **JWT**, and the token is stored in a **cookie**. Some routes are protected and require the user to have the **admin** role.

---

## Main Technologies & Packages

- **Node.js / Express 5** – HTTP server and routing.
- **MongoDB + Mongoose** – database and ODM.
- **jsonwebtoken** – sign and verify JWT tokens.
- **bcryptjs** – hashing user passwords.
- **express-validator** – request validation.
- **multer** – file uploads (product images, etc.).
- **cookie-parser** – reading cookies (JWT token).
- **cors** – CORS configuration between frontend and backend.
- **helmet** (can be enabled later) – security HTTP headers.
- **node-cron** – scheduled jobs (e.g. order cleanup).

---

## Folder Structure (mental shortcut for myself)

Main backend root: `back/src`

- `server.js`  
  Entry point: connects to the database, creates the app, and starts listening on the port.

- `app.js`  
  Builds and configures the Express app:
  - Enables `express.json`, `cookieParser`, `urlencoded`
  - Sets up `cors` with `allowedOrigins`
  - Serves static files from `uploads/`
  - Registers all routes under `/api/*`
  - Health route: `/health`
  - Error handler and 404 handler

- `config/db.js`  
  Exposes `connectDB(uri)` to connect to MongoDB using `mongoose`.

- `routes/`  
  All API endpoints live here:
  - `auth.route.js` – register, login, logout, `me`, check email, edit user
  - `product.route.js` – products (list, search, latest, create, update, delete)
  - `order.route.js` – orders
  - `comment.route.js` – comments and likes
  - `user.route.js` – users management
  - `category.route.js` – categories
  - `navbarItem.route.js` – navbar items
  - `upload.route.js` – file uploads
  - `address.route.js` – addresses

- `models/`  
  Mongoose models: `Product`, `Order`, `User`, `Category`, `NavbarItem`, `Comment`, etc.

- `middlewares/`  
  Middlewares:
  - `auth.middleware.js` – `requireAuth` and `requireAdmin` (based on JWT and user role)
  - `validate.middleware.js` – validation handling with `express-validator`
  - `uploads.js` – `multer` configuration for file uploads
  - others like `parse-json-fields.js`, `comment.middleware.js`, etc.

- `jobs/OrderCleanUp.js`  
  Scheduled job using `node-cron` for periodic operations on orders (cleanup, status updates, etc.).

- `utils/`  
  Helper functions, e.g.:
  - `jwt.js` – create/verify JWT
  - `get-addres-file.js` – calculate physical file path for deletion with `fs.unlink`

---

## Setup & Run

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- `.env` file inside the `back` folder

### Install dependencies

```bash
cd back
npm install
```

### Environment variables (`.env`)

Example:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/fabric
JWT_SECRET=some_strong_random_secret
# Optional:
# CLIENT_ORIGIN=http://localhost:3000
```

- `PORT` – server port (default 4000).
- `MONGODB_URI` – MongoDB connection string.
- `JWT_SECRET` – secret key for JWT.

### NPM scripts

- **development**:

```bash
npm run dev
```

- **production / normal run**:

```bash
npm start
```

After the server starts:

- base URL: `http://localhost:4000`
- health: `GET http://localhost:4000/health`

---

## Important Routes (quick reference)

### Auth – `/api/auth`

- `POST /api/auth/register` – register (name, email, password).
- `POST /api/auth/login` – login; sets JWT token in a cookie.
- `POST /api/auth/adLogin` – admin login.
- `GET /api/auth/me` – current user info (requires `requireAuth`).
- `POST /api/auth/logout` – logout.
- `POST /api/auth/check-email` – check if email exists.
- `PUT /api/auth/:id` – edit user.

### Product – `/api/product`

- `GET /api/product`  
  Product list with:
  - `category` (slug or array of slugs)
  - `page`, `limit`
  - `search` on `name` and `shortDescription`

- `GET /api/product/all`  
  All products with `populate('categories')`.

- `GET /api/product/last`  
  Latest N products (currently 10).

- `GET /api/product/:slug`  
  Get a single product by `slug` or `_id`, including `categories` and processed `comments`:
  - filters `answer` by `status === "active"`
  - computes `likesCount`
  - sets `likedByCurrentUser` based on `userId` from `req.user`

- `DELETE /api/product/delete/:id`  
  Delete a product (admin only) and remove image files from disk.

- `POST /api/product/add`  
  Create a new product (admin):
  - request validation via `express-validator`
  - image upload with `multer`
  - stores `images` as `{ url, alt }` (full server URL)

- `POST /api/product/edit/:id`  
  Edit product (admin):
  - if new files are uploaded → delete previous images (based on `prevImages`) and use new ones
  - if no new files → keep `prevImages`

### Other routes (just a reminder)

- `/api/order` – orders.
-, `/api/comment` – comments and likes.
- `/api/user` – user management.
- `/api/category` – categories.
- `/api/navbar` – navbar items.
- `/api/address` – addresses.
- `/api/upload` – file upload.

---

## Auth & Roles (Auth Middleware)

File: `middlewares/auth.middleware.js`

- `requireAuth(env)`:
  - reads JWT from `req.cookies.token`
  - verifies it with `verifyJwt` and `env.JWT_SECRET`
  - on success: `req.user = { id, email }`
  - on failure: responds with `401 Unauthorized`

- `requireAdmin(env)`:
  - same as `requireAuth`, plus:
  - checks `payload.role === 'admin'`
  - if not admin → `401` with an error message
  - on success: `req.user = { id, email, role }` and continues

Frontend note for myself:
- Always send protected requests with `credentials: 'include'` so cookies are included.

---

## File Upload & Image Handling

- In `app.js`:

```js
app.use('/uploads', express.static('uploads'));
```

- That means any file saved in the `uploads/` directory is available at:

```text
http://<HOST>:<PORT>/uploads/<filename>
```

- In product routes:
  - `add` and `edit` use `multer` for file uploads.
  - each image is stored in the `images` array as:
    - `url` – full URL on the server
    - `alt` – usually the product name
  - when an image is removed, `getAddress` is used to compute the physical path and `fs.unlink` deletes the file.

---

## Scheduled Job for Orders

- `jobs/OrderCleanUp.js` is executed by `node-cron` (imported in `server.js`).
- Used for periodic tasks on orders (e.g. cleaning up old orders).
- If I need to change its behavior, I should check this file and the `Order` model.

---

## Development Notes for Myself

- To add a new route:
  1. Create a new file in `src/routes/*.route.js`
  2. Define routes using `Router()`
  3. Register it in `app.js` with `app.use("/api/...", yourRoutes)`

- To extend models:
  - First update the `mongoose` model in `models/`
  - Then update validation and related routes/controllers

- CORS:
  - If the frontend domain changes, update `allowedOrigins` in `app.js`.
