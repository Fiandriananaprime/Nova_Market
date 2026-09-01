# Nova Market

> A modern multi-vendor marketplace platform connecting buyers, sellers, local businesses and administrators in a single shopping experience.

Nova Market is a full-featured marketplace frontend designed around a multi-vendor e-commerce model. The platform provides dedicated experiences for **buyers**, **sellers**, and **administrators**, with product discovery, shopping cart management, checkout, orders, seller management, analytics and marketplace administration.

The application is currently built with mocked data for frontend development and UI validation.

---

## ✨ Features

### 🛍️ Buyer experience

Buyers can browse and interact with the marketplace through a complete shopping flow:

* Landing page with marketplace overview
* Product discovery and browsing
* Product categories
* Product details with specifications
* Seller/store profiles
* Product search and filtering
* Shopping cart
* Quantity management
* Favorites / wishlist
* Checkout
* Order history
* Order details and tracking information
* Buyer profile
* Account settings
* Multi-language interface: English / French
* Light / dark / system theme

### 🏪 Seller dashboard

Sellers have their own dedicated workspace to manage their store:

* Seller dashboard
* Revenue and order statistics
* Product management
* Add and edit products
* Inventory management
* Order management
* Analytics
* Customer management
* Reviews management
* Promotions
* Store settings
* Seller account settings

### ⚙️ Administration

Administrators can manage the complete marketplace:

* Admin dashboard
* Marketplace revenue statistics
* Buyer statistics
* Seller statistics
* Product statistics
* User management
* Buyer management
* Seller management
* Seller application review
* Product management
* Category management
* Order management
* Payment management
* Promotion management
* Review management
* Reports and analytics
* Admin settings

### 🌍 Public pages

Visitors can access:

* Landing page
* How it works
* Categories
* Sellers
* About
* Login
* Registration

### 🎨 UI / UX

* Responsive design
* Modern marketplace dashboard interfaces
* Reusable UI components
* Toast notifications
* Ratings and verified seller badges
* Status badges
* Responsive tables
* Charts and analytics
* Dark mode
* System theme detection
* English / French interface

---

## 🧱 Tech Stack

### Frontend

| Technology   | Version / Usage |
| ------------ | --------------- |
| React        | `19.x`          |
| TypeScript   | `5.7.x`         |
| Vite         | `8.x`           |
| Tailwind CSS | `4.x`           |
| React Router | `8.3.x`         |
| Recharts     | `3.x`           |
| Lucide React | `1.x`           |
| Oxfmt        | Code formatting |

The project uses **React + TypeScript + Vite** and Tailwind CSS for the interface.

---

## 📁 Project Structure

```text
Nova_Market/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── ProductCard.tsx
│   │
│   ├── contexts/
│   │   ├── AppContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── data/
│   │   └── mock.ts
│   │
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── BuyerLayout.tsx
│   │   ├── SellerLayout.tsx
│   │   └── AdminLayout.tsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   ├── buyer/
│   │   ├── seller/
│   │   └── admin/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   └── index.css
│
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── LICENSE
```

---

## 🚀 Installation

### Prerequisites

Make sure you have installed:

* Node.js
* pnpm

You can verify your environment with:

```bash
node -v
pnpm -v
```

### Clone the repository

```bash
git clone https://github.com/Fiandriananaprime/Nova_Market.git
cd Nova_Market
```

### Install dependencies

Since the repository includes a `pnpm-lock.yaml`, pnpm is the recommended package manager.

```bash
pnpm install
```

---

## 💻 Development

Start the Vite development server:

```bash
pnpm dev
```

The application is configured to run Vite with:

```text
--host 0.0.0.0
```

Vite will display the local development URL in the terminal, typically:

```text
http://localhost:5173
```

---

## 📦 Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

---

## 🧹 Formatting

The project uses **Oxfmt** for formatting.

Run:

```bash
pnpm format
```

---

## 🎨 Design System

Nova Market uses a custom color palette defined in `src/index.css`.

### Primary palette

| Color     | Hex       | Usage                                       |
| --------- | --------- | ------------------------------------------- |
| Navy      | `#16262E` | Main dark surfaces, headings, hero sections |
| Blue      | `#0077B6` | Primary actions, links, charts              |
| Turquoise | `#5ABCB9` | Accent color, highlights, success elements  |
| Lavender  | `#F5EFFF` | Main light background                       |
| Gray      | `#D0CCD0` | Borders and separators                      |

### Additional colors

```text
Foreground:          #16262E
Card:                #FFFFFF
Secondary:           #EBE8F0
Muted foreground:    #5D6D75
Primary:             #0077B6
Accent:              #5ABCB9
Border:              #D0CCD0
```

### Dark mode

Dark theme variables are also defined in the design system:

```text
Background:       #0F1E25
Foreground:       #F5EFFF
Card:             #16262E
Secondary:        #1E3540
Border:           #2A4555
```

The theme supports:

```text
light
dark
system
```

The selected theme is persisted using `localStorage`.

---

## 🌐 Internationalization

The frontend currently supports:

* 🇬🇧 English
* 🇫🇷 French

The language state is managed through `AppContext`.

Example:

```tsx
t(
  'Explore products',
  'Explorer les produits'
)
```

---

## 🛒 Application State

The main application context manages:

* Current language
* Current user role
* Shopping cart
* Cart quantities
* Cart total
* Favorites
* Favorite toggling
* Translations

The relevant implementation is located in:

```text
src/contexts/AppContext.tsx
```

---

## 📊 Current Data Source

At the moment, the application uses local mock data stored in:

```text
src/data/mock.ts
```

This includes sample data for:

* Categories
* Sellers
* Products
* Orders
* Seller metrics
* Revenue statistics
* Admin statistics
* Seller applications

The current frontend therefore works as a complete **UI / frontend prototype**, but it is not yet using a persistent API for marketplace data.

---

## 🔌 Backend

The frontend repository currently does not contain a public backend repository or API URL in its configuration.

### Backend repository

```text
Backend repository: Not yet linked
```

The frontend can later be connected to a REST API for:

* Authentication
* User management
* Products
* Categories
* Sellers
* Orders
* Payments
* Reviews
* Favorites
* Inventory
* Analytics

> Replace this section with the actual backend repository URL once the Nova Market backend is available.

Example:

```md
## 🔌 Backend

Nova Market Backend:

https://github.com/<username>/Nova_Market_backend
```

---

## 🗺️ Main Routes

### Public

```text
/
 /how-it-works
 /categories
 /sellers
 /about
 /login
 /register
```

### Buyer

```text
/shop
/products
/products/:id
/stores/:id
/cart
/checkout
/orders
/orders/:id
/favorites
/profile
/settings
```

### Seller

```text
/seller
/seller/products
/seller/products/new
/seller/products/:id/edit
/seller/inventory
/seller/orders
/seller/analytics
/seller/reviews
/seller/promotions
/seller/store
/seller/settings
/seller/customers
```

### Admin

```text
/admin
/admin/users
/admin/buyers
/admin/sellers
/admin/sellers/applications
/admin/products
/admin/categories
/admin/orders
/admin/payments
/admin/promotions
/admin/reviews
/admin/reports
/admin/settings
```

---

## 🧩 Architecture

The frontend is organized around reusable layouts and role-specific pages.

```text
PublicLayout
     │
     ├── Landing
     ├── Login
     ├── Register
     └── Public pages

BuyerLayout
     │
     ├── Shop
     ├── Products
     ├── Product details
     ├── Cart
     ├── Checkout
     ├── Orders
     ├── Favorites
     └── Profile

SellerLayout
     │
     ├── Dashboard
     ├── Products
     ├── Inventory
     ├── Orders
     ├── Analytics
     ├── Customers
     ├── Reviews
     └── Store settings

AdminLayout
     │
     ├── Dashboard
     ├── Users
     ├── Sellers
     ├── Products
     ├── Categories
     ├── Orders
     ├── Payments
     └── Reports
```

---

## 📈 Marketplace Model

Nova Market follows a **multi-vendor marketplace architecture**.

A typical marketplace flow is:

```text
Buyer
  │
  ├── Discover products
  │
  ├── Compare sellers
  │
  ├── Add products to cart
  │
  ├── Checkout
  │
  └── Track orders

Seller
  │
  ├── Manage store
  ├── Manage products
  ├── Manage inventory
  ├── Manage orders
  ├── Analyze revenue
  └── Manage customers

Admin
  │
  ├── Manage users
  ├── Manage sellers
  ├── Review applications
  ├── Manage products/categories
  ├── Monitor orders/payments
  └── Monitor marketplace performance
```

---

## 🛠️ Development Status

### Implemented

* Responsive marketplace UI
* Public pages
* Buyer interface
* Seller dashboard
* Admin dashboard
* Product browsing
* Product details
* Shopping cart
* Checkout interface
* Orders
* Favorites
* Seller management screens
* Admin management screens
* Analytics dashboards
* Charts
* Theme system
* English / French interface
* Reusable components
* Mock marketplace data

### Planned backend integration

* Real authentication
* User roles and permissions
* Product API
* Seller API
* Order API
* Payment integration
* Persistent cart
* Favorites persistence
* Inventory synchronization
* Reviews and ratings
* Real analytics
* Database integration

---

## 📜 License

This project is distributed under the license available in the [`LICENSE`](./LICENSE) file.

---

## 🔗 Repository

Frontend:

https://github.com/Fiandriananaprime/Nova_Market.git

Backend:
https://github.com/Fiandriananaprime/Nova_Backend.git