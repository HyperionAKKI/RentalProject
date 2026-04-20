# GateX Rental Management Project

A comprehensive Full-Stack Web Application designed and developed to manage property rentals, tenant billing, maintenance requests, and document handling securely and efficiently. Designed with two operational sides: A **User Dashboard** and an overarching **Admin Portal**.

## Tech Stack
- **Frontend:** React (Vite 5), TypeScript, Custom CSS, and Axios for networking.
- **Backend:** Node.js, Express.js, TypeScript.
- **Database Architecture:** Prisma ORM with SQLite (easily swapped to PostgreSQL).
- **Security:** JWT (JSON Web Tokens) Authentication, Role-based Route Protection, and Bcrypt hashing.

---

## Features
* **Authentication:** Multi-role login (Tenant vs Administrator) routing immediately rendering dynamic dashboards upon sign-in.
* **Apartment/Room Tracking:** Admins can view available or booked statuses dynamically.
* **Billing System:** Securely tracking pending, overdue, and paid balances directly linked between Administration and the Tenant interfaces.
* **Maintenance Tracker:** Live tickets allowing tenants to request maintenance while administrators can update ticket statuses to "In Progress" or "Completed."
* **Document Auditing:** Proofs of IDs and Agreements linked via metadata for tenant tracking.

---

## Quick Start & Installation

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd rental-backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Boot the Express Server:
   ```bash
   npm run dev
   ```
   *The server runs locally on `http://localhost:5000`*

### 2. Frontend Setup
1. In a second terminal, navigate to the frontend directory:
   ```bash
   cd rental-frontend-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React server:
   ```bash
   npm run dev
   ```
   *The application will boot at `http://localhost:5173`*

---

## Testing Options and Verification

### Standard Admin Login
You can access the Admin Dashboard naturally with the default credentials securely seeded into the Database.

- **URL:** Navigate to `/auth` on your frontend host.
- **Email:** `admin@rental.com`
- **Password:** `admin123`

### Exploring the Database Manually
Since testing can be tedious, Prisma provides a beautiful Database User Interface! Go into your `rental-backend` folder and run this code while the backend is stopped:
```bash
npx prisma studio
```
Navigate to `http://localhost:5555` to dynamically inject Data, mock new Users, simulate Payments, or change Roles directly in your browser.
