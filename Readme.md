# 📅 Event Management System (EMS)

A full-stack **event scheduling and timezone-aware calendar application** built with:

- **React (Vite)** + **shadcn/ui**
- **Node.js + Express**
- **MongoDB Atlas**
- **Day.js (UTC + timezone plugin)**

Users can create profiles, schedule events across multiple time zones, view them with instant timezone conversion, and update events on the frontend.

### Live Demo: [https://event-management-system-swart-ten.vercel.app/](https://event-management-system-swart-ten.vercel.app/)

---

## 🚀 Features

### ✅ Frontend

- Built with **React + Vite**
- Beautiful UI using **shadcn/ui** + TailwindCSS
- Timezone-aware display using **dayjs + timezone plugin**
- Profile selection dropdown
- Event creation with date/time pickers
- Events filtered by selected profiles
- UTC → Local timezone conversion on the fly
- Modern, responsive UI

### 🛠 Backend

- **Node.js + Express**
- All datetimes stored in **UTC**
- Frontend handles all timezone conversions
- MongoDB Atlas using Mongoose
- Event fetch using API with profile filtering
- CORS configured
- Modular routes + controllers

## 📂 Project Structure

```bash
repo/
│
├── Backend/
│ ├── config/
│ ├── node_modules
│ └── src
│   ├── index.js
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── services/
│
└── Frontend/
│  ├── components/
│  ├── lib/
│  ├── node_modules/
│  ├── public/
│  └── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── store/
│   ├── utils/
│   └── App.jsx
```

## ⬇️ Installation

### 1️⃣ Clone repository

```bash
git clone https://github.com/T3rex/Event-Management-System.git
cd Event-Management-System
```

### 2️⃣ Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory with the following content:

```bash
DB_CONNECTION=your_mongodb_connection_string
PORT=3001
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### 3️⃣ Frontend setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` directory with the following content:

```
VITE_BACKEND_URL=http://localhost:3001
```

You can change the backend URL if your backend is hosted elsewhere.

### 4️⃣ Run the application

#### Start Backend

```bash
cd ../Backend
npm start
```

The backend server will start on `http://localhost:3001`.

#### Start Frontend

```bash
cd ../Frontend
npm run dev
```

The frontend development server will start, usually on `http://localhost:5173`.
You can now access the Event Management System in your web browser.

---

## 🌍 Timezone Handling

- User selects their timezone when creating an event.
- All datetimes are stored in **UTC** in the database.
- Example:

```json
{
  "startTimeUTC": "2025-11-11T06:30:00.000Z",
  "endTimeUTC": "2025-11-11T10:30:00.000Z",
  "timezone": "America/Los_Angeles"
}
```

- When fetching events, the backend returns the UTC times.
- The frontend uses **dayjs with the timezone plugin** to convert and display event times in the user's local timezone.
- This ensures consistency and accuracy across different user locations.

```
 LOCAL/SELECTED LOCAL TIMEZONE -> UTC -> STORED IN DB -> FETCHED AS UTC -> CONVERTED TO LOCAL/SELECTED TIMEZONE
```

## 📖 API Endpoints

| Method | Endpoint   | Description          |
| ------ | ---------- | -------------------- |
| GET    | `/profile` | Get all profiles     |
| POST   | `/profile` | Create a new profile |

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/event`                  | Create event                       |
| GET    | `/event?profileIds=p1,p2` | Fetch events for selected profiles |
| PUT    | `/event/:id`              | Update event by ID                 |

## 🔧 Future Improvements

- Logging updates
- Auth (JWT)
- Drag & drop events
- Notifications / reminders
- Export to Google Calendar

## 🤝 Contributing

Pull requests are welcome! For major updates, open an issue to discuss changes.

## 📄 License

MIT License — free to use and modify.
See `LICENSE` for details.
