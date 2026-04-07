# 🧾 OrderFlow Admin Dashboard

Admin dashboard application for managing customer orders.
Built as a portfolio project to demonstrate modern frontend development with real backend integration.

---

## 🚀 Live Demo

👉 https://orderflow-topaz-sigma.vercel.app/
👉 https://github.com/mmagari/orderflow-admin

---

## ✨ Features

* 📊 Dashboard with key metrics (orders, revenue, statuses)
* 📦 Orders list with:

  * search
  * filtering (status, payment method)
  * sorting
  * pagination
* 🔍 Order details view with:

  * customer information
  * shipping data
  * order items
* 🔄 Update order status (with instant UI feedback)
* 🔔 Toast notifications for actions
* ⚡ Loading skeletons for better UX
* ❌ Error states handling

---

## 🛠 Tech Stack

* **React** + **TypeScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **TanStack Query (React Query)**
* **Supabase** (database + API)

---

## 🧠 What I focused on

This project was built with emphasis on:

* clean and maintainable component structure
* separation of concerns (API layer, UI, state)
* real backend integration (Supabase)
* async state management using React Query
* user experience (loading states, feedback, error handling)

---

## 🗂 Project Structure

```bash
src/
  api/            # API calls (Supabase)
  components/     # UI components
  pages/          # App pages
  lib/            # helpers & utilities
  types/          # TypeScript types
```

---

## 🔌 Backend (Supabase)

The app uses Supabase as a backend:

* `orders` table
* `order_items` table
* relational data fetching
* updating order status via API

---

## ⚙️ Getting Started

### 1. Clone repo

```bash
git clone https://github.com/mmagari/orderflow-admin
cd orderflow-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run development server

```bash
npm run dev
```

---

## 🧪 Future Improvements

* authentication (Supabase Auth)
* optimistic UI updates
* role-based access
* charts on dashboard
* better mobile optimization

---

## 📸 Screenshots
screenshots/Dashboard.png
screenshots/Orders.png

---

## 🙋‍♂️ Author

Created by J.M.

---

## 📌 Notes

This project was built as part of my journey to become a frontend developer.
I'm actively learning and improving — feedback is always welcome!
