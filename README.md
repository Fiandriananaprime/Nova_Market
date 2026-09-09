# Nova Market Admin

> Admin frontend for Nova Market, a multi-vendor e-commerce marketplace.

Nova Market Admin is the administration portal used to manage the marketplace from a single interface.

The frontend is **admin-only**. Buyers and sellers are still business entities managed by administrators, but their dedicated Buyer and Seller portals are not part of this repository.

---

## Features

### Dashboard

- Marketplace overview
- Revenue and order statistics
- User and seller statistics
- Product statistics
- Reports and analytics

### User management

- Browse users
- View user details
- Manage marketplace accounts

### Seller management

- Browse sellers
- View seller/store information
- Review seller applications

### Product management

- Browse products
- View product details
- Manage marketplace products

### Order management

- Browse orders
- View order details
- Monitor order status

### Payment management

- View payment information
- Monitor payment methods and payment activity

### Promotions

- Manage marketplace promotions
- Filter and review promotional products

### Settings

- Manage administrator settings

### UI / UX

- Responsive admin interface
- Reusable components
- Charts and analytics with Recharts
- Toast notifications
- Light / dark / system theme
- English / French interface

---

## Tech Stack

| Technology | Usage |
| --- | --- |
| React | UI |
| TypeScript | Type-safe development |
| Vite | Development server and build tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| Axios | API communication |
| Recharts | Charts and analytics |
| Lucide React | Icons |
| i18next / react-i18next | Internationalization |
| Oxfmt | Code formatting |

---

## Requirements

Install the following before running the project:

- Node.js
- pnpm

Check your versions:

```bash
node -v
pnpm -v
```

The repository includes a `pnpm-lock.yaml`, so pnpm is the recommended package manager.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Fiandriananaprime/Nova_Market.git
cd Nova_Market
```

Install dependencies:

```bash
pnpm install or
npm install
```

---

## Environment configuration

The frontend reads the backend API URL from the Vite environment variable:

```text
VITE_API_URL
```

Create a `.env` file in the project root and configure the API URL used by the backend.

Example:

```env
VITE_API_URL=http://localhost:3001
```

Use the actual URL of your running Nova Market backend when deploying or connecting to another environment.

> Do not commit secrets to `.env` files. The frontend should only receive configuration values that are safe to expose to the browser.

---

## Run the application

Start the development server:

```bash
pnpm dev
or
npm run dev
```

The project starts Vite with `--host 0.0.0.0`. The terminal will display the local URL, normally:

```text
http://localhost:5173
```

Open the application in your browser and use the administrator login.

---

## How authentication works

The application uses JWT-based authentication.

The general flow is:

```text
Login
  ↓
POST /auth/login
  ↓
Check user role
  ↓
Admin only
  ↓
Store access token / refresh token
  ↓
Open /admin
```

The API client automatically attaches the access token to authenticated requests.

When an access token expires, the client attempts to refresh it using the refresh token. If authentication can no longer be restored, the local session is cleared and the user is redirected to the login page.

The stored browser keys are:

```text
accessToken
refreshToken
user
```

The admin frontend rejects non-admin accounts at login and does not open the administration portal for them.

---

## Main routes

The application is restricted to the administrator portal.

```text
/login

/admin
/admin/users
/admin/users/:id
/admin/sellers
/admin/sellers/:id
/admin/sellers/applications
/admin/sellers/applications/:id
/admin/products
/admin/products/:id
/admin/orders
/admin/orders/:id
/admin/payments
/admin/promotions
/admin/reports
/admin/settings
```

Unauthenticated users are redirected to the login page.

---

## Application architecture

```text
                 ┌─────────────────┐
                 │      Login      │
                 └────────┬────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ ProtectedRoute     │
                │ requiredRole=admin │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │    AdminLayout    │
                └─────────┬─────────┘
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
   Dashboard          Management          Analytics
        │                 │                  │
        │          Users / Sellers /        │
        │          Products / Orders /      │
        │          Payments / Promotions    │
        │                                   │
        └─────────────────┬─────────────────┘
                          ▼
                    Nova Market API
```

Admin pages are lazy-loaded so that each section can be loaded only when it is accessed, reducing the initial JavaScript bundle.

---

## Project structure

The project is organized by technical responsibility and business domain:

```text
src/
├── api/
│   ├── admin/
│   │   ├── analytics.api.ts
│   │   ├── dashboard.api.ts
│   │   ├── order.api.ts
│   │   ├── payment.api.ts
│   │   ├── product.api.ts
│   │   ├── sellerApplication.ts
│   │   ├── store.api.ts
│   │   └── user.api.ts
│   ├── auth.api.ts
│   └── axios.ts
│
├── components/
│   ├── ui/
│   └── admin/domain-specific components
│
├── contexts/
│   ├── AppContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
│
├── layouts/
│   └── AdminLayout.tsx
│
├── pages/
│   ├── dashboard/
│   ├── users/
│   ├── SellerApplication/
│   ├── stores/
│   ├── products/
│   ├── orders/
│   ├── payment/
│   └── analytics/
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── routes.tsx
├── main.tsx
└── index.css
```

As the application is admin-only, Buyer and Seller portal layouts and routes are intentionally not part of the frontend architecture.

---

## API integration

API communication is handled through Axios.

The API base URL is read from:

```text
VITE_API_URL
```

Authenticated requests use the access token stored in browser storage.

The API layer is separated into administration-specific modules under:

```text
src/api/admin/
```

Authentication is handled separately in:

```text
src/api/auth.api.ts
```

The frontend is designed to consume the Nova Market backend API rather than keeping marketplace business data in the frontend.

---

## Backend

The backend is maintained in a separate repository:

```text
https://github.com/Fiandriananaprime/Nova_Backend.git
```

Run the backend separately, then point `VITE_API_URL` to its base URL.

Example local configuration:

```env
VITE_API_URL=http://localhost:3001
```

The exact API contract should follow the Nova Market OpenAPI specification.

---

## Internationalization

The interface supports:

- English
- French

Translations are handled with `i18next` and `react-i18next`.

Keep translated UI text inside the existing localization system instead of hard-coding user-facing strings across components.

---

## Theme

The application supports:

```text
light
dark
system
```

The design system is defined through the project's CSS variables and Tailwind CSS.

Core project colors include:

| Color | Hex |
| --- | --- |
| Navy | `#16262E` |
| Primary Blue | `#0077B6` |
| Turquoise | `#5ABCB9` |
| Light Lavender | `#F5EFFF` |

---

## Available commands

### Development

```bash
pnpm dev
```

Starts the Vite development server.

### Production build

```bash
pnpm build
```

Creates the production build.

### Preview production build

```bash
pnpm preview
```

Serves the generated production build locally for verification.

### Formatting

```bash
pnpm format
```

Formats the project using Oxfmt.

---

## Recommended development workflow

### 1. Start the backend

Make sure the Nova Market backend is running and that its API URL is known.

### 2. Configure the frontend

Create `.env` and set:

```env
VITE_API_URL=<backend-url>
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Start the frontend

```bash
pnpm dev
```

### 5. Authenticate as an administrator

Open the application, sign in with an administrator account, then access the `/admin` portal.

### 6. Develop by domain

When adding a feature, keep the API, page and reusable components close to their business domain where practical. Avoid reintroducing Buyer/Seller portal logic into this repository.

---

## Build verification

Before opening a pull request, run:

```bash
pnpm format
pnpm build
```

Also verify:

- Admin login works
- Protected routes reject unauthenticated access
- Non-admin users cannot access the admin portal
- API requests use the configured backend URL
- Lazy-loaded pages load correctly
- No obsolete Buyer/Seller routes have been reintroduced

---

## Current scope

This repository is the **Admin frontend** of Nova Market.

The scope of this application is:

```text
Administration
├── Dashboard
├── Users
├── Sellers
├── Seller Applications
├── Stores
├── Products
├── Orders
├── Payments
├── Promotions
├── Reports / Analytics
└── Settings
```

Buyer and Seller remain marketplace roles and entities, but their dedicated frontends are maintained outside this admin portal.

---

## Repository

Frontend:

https://github.com/Fiandriananaprime/Nova_Market

Backend:

https://github.com/Fiandriananaprime/Nova_Backend

---

## License

See the [`LICENSE`](./LICENSE) file for the project's license.
