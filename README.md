# Fabric Store

Fabric Store is a full-stack e-commerce application for selling fabrics. The project is split into a Next.js frontend and an Express/MongoDB backend.

## ✨ Features

* User Authentication (JWT & Cookies)
* Product Catalog & Search
* Product Details Page
* Shopping Cart & Checkout Flow
* Address Management
* Order Tracking
* Product Comments & Reviews
* Category Management
* Responsive Design
* Payment Integration

## 📸 Screenshots

### Home Page

![Home Page](./docs/images/home.png)

### Product Details

![Product Details](./docs/images/product-details.png)

### Order List

![Product Listing](./docs/images/order.png)


## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Biome

### Backend

* Node.js
* Express 5
* MongoDB
* Mongoose

### Authentication

* JWT
* HTTP Cookies

### File Uploads

* Multer
* Local File Storage

## 📂 Project Structure

```text
.
├── compose.yaml   # Docker Compose: frontend, backend, MongoDB
├── front/         # Next.js storefront and user flows
│   ├── Dockerfile
│   └── .env.example
└── back/          # Express REST API, MongoDB models, uploads, auth, orders
    └── Dockerfile
```

## 🌐 Frontend Routes

* `/` Home Page
* `/products` Product Listing
* `/products/[slug]` Product Details
* `/login`
* `/register`
* `/profile`
* `/profile/addresses`
* `/order/cart`
* `/order/address`
* `/order/shipment`
* `/order/payment`
* `/payment-success`
* `/payment-failed`

## 🔌 Backend API Modules

* Authentication
* Products
* Orders
* Comments
* Users
* Categories
* Navbar Management
* Addresses
* File Uploads
* Payments
* Settings

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `back` directory:

```env
PORT=3000
RUN_MODE=local

MONGODB_URI=mongodb://admin:123456@mongodb:27017/mydb?authSource=admin

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7

CLIENT_ORIGINS=http://localhost:3000,http://localhost:4200

PAYMENT_TOKEN=<your_payment_provider_token>
```

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| PORT           | Port inside the backend container (default 3000) |
| RUN_MODE       | `local` or `host`                                |
| MONGODB_URI    | MongoDB connection string                        |
| JWT_SECRET     | JWT signing secret                               |
| JWT_EXPIRES_IN | Expiration in **days** as a number (e.g. `7`)    |
| CLIENT_ORIGINS | Allowed frontend origins                         |
| PAYMENT_TOKEN  | Payment gateway token                            |

> With Docker Compose, the backend is published on the host as **`localhost:4000`** (`4000:3000`).

### Frontend

Copy `front/.env.example` to `front/.env` for local (non-Docker) runs:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
API_BASE_URL=http://localhost:4000/api
```

| Variable                   | Used in | Description |
| -------------------------- | ------- | ----------- |
| `NEXT_PUBLIC_API_BASE_URL` | CSR (browser) | API base URL reachable from the host browser |
| `API_BASE_URL`             | SSR (Next server) | API base URL for server-side requests |

In Docker Compose these are set automatically:

* CSR → `http://localhost:4000/api`
* SSR → `http://backend:3000/api` (Compose service name)

## 🚀 Installation

### Frontend

```bash
cd front
npm install
```

### Backend

```bash
cd back
npm install
```

## 🐳 Run with Docker Compose

From the project root (requires `back/.env`):

```bash
docker compose up --build
```

Services:

| Service    | Host URL                  |
| ---------- | ------------------------- |
| Frontend   | http://localhost:3000     |
| Backend    | http://localhost:4000     |
| MongoDB    | localhost:27017           |

Stop:

```bash
docker compose down
```

## ▶️ Run Locally (without Docker)

Start MongoDB yourself, then:

```bash
cd back
npm run dev
```

```bash
cd front
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🏥 Health Check

```http
GET http://localhost:4000/health
```

## 👨‍💻 Author

**Arshia Zinedine**

GitHub: https://github.com/zArshiaz
