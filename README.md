# 📇 Contact App (MERN Stack)

A simple and clean **Contact Management Application** built using the **MERN stack**. Users can add contacts with validation, view them in a list, sort them, and delete entries. The project focuses on **clean UI, good UX, and proper frontend-backend separation**.

---

## ✨ Features

- Add new contacts with validation
- Email domain validation (gmail, yahoo, outlook, hotmail)
- Phone number validation (minimum 10 digits)
- Button disabled until form is valid
- No validation errors shown on initial load
- Sort contacts by:

  - Newest First
  - Oldest First
  - Name A → Z
  - Name Z → A

- Delete contacts
- Toast notifications for success & errors
- MongoDB Atlas integration

---

## 🗂️ Project Structure

```
contact-app/
│
├── backend/
│ ├── models/
│ │ └── Contact.js # Mongoose schema for contacts
│ ├── routes/
│ │ └── contactRoutes.js # API routes for CRUD operations
│ ├── .env # Environment variables
│ ├── server.js # Express server setup
│ └── package.json # Backend dependencies
│
├── src/ # Frontend React app
│ ├── components/
│ │ ├── ContactForm.jsx # Form to add a new contact with validation
│ │ └── ContactList.jsx # Displays contacts with sorting & delete
│ ├── App.jsx # Main React component
│ ├── App.css # Styling for frontend
│ └── main.jsx # React DOM render entry
│
├── package.json # Frontend dependencies
└── README.md
```

---

## 🧠 Main Components Overview

### 1️⃣ ContactForm Component

**File:** `contact-app/src/components/ContactForm.jsx`

This component handles:

- Controlled form inputs
- Field-level validation
- Disabled submit button until form is valid
- Showing errors only after user interaction (touched state)
- Sending POST request to backend

**Validations included:**

- Name is required
- Phone is required and must be at least 10 digits
- Email is optional but must belong to allowed domains

**UX highlights:**

- No red errors on page load
- Errors appear only after typing or submit
- Button visually disabled when form is invalid

---

### 2️⃣ ContactList Component

**File:** `contact-app/src/components/ContactList.jsx`

This component is responsible for:

- Displaying all contacts in a table
- Sorting contacts using a dropdown
- Deleting contacts
- Memoized sorting using `useMemo` for performance

**Sorting options:**

- Newest First (default)
- Oldest First
- Name A → Z
- Name Z → A

**UI Features:**

- Custom dropdown button
- Hover-based menu styles
- Clean table layout

---

## 🎨 Styling

- All reusable styles are placed in **App.css**
- Button styles use `.fancy-btn`
- Dropdown styles use `.dropdown-btn`, `.dropdown-menu`, `.dropdown-item`
- Disabled states handled using `:disabled`

---

# Contact App Backend Overview

## models/Contact.js

This file defines the MongoDB schema for a contact.  
It includes the following fields:

- `name` (required)
- `email` (optional)
- `phone` (required, minimum 10 digits)
- `message` (optional)
- `createdAt` (auto-generated timestamp)

This schema ensures that all contact data stored in MongoDB follows a consistent structure.

## routes/contactRoutes.js

This file defines the API endpoints for managing contacts:

- `GET /api/contacts` – Fetch all contacts from the database.
- `POST /api/contacts` – Add a new contact. Validates required fields before saving.
- `DELETE /api/contacts/:id` – Delete a contact by its unique ID.

Together, `Contact.js` and `contactRoutes.js` handle the backend logic, including data storage and CRUD operations for the Contact App.

### Tech Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/contacts     | Add new contact  |
| GET    | /api/contacts     | Get all contacts |
| DELETE | /api/contacts/:id | Delete a contact |

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

---

## 🚀 How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🧪 Learning Outcomes

- React form handling & validation
- UX-friendly error handling
- useEffect + useMemo usage
- MERN stack API integration
- Clean folder structure
- Reusable CSS patterns

---

## 📌 Future Improvements

- Edit contact feature
- Search functionality
- Pagination
- Authentication
- Deployment

---

## 👩‍💻 Author

**Soleha Siddique**
3rd Year Computer Science Student
Focused on MERN, Next.js & AI/ML

---

⭐ If you like this project, give it a star and feel free to fork it!
