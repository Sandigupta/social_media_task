# Social Media Task Application
---
## User Submission Form with Admin Dashboard

This project implements a **User Submission Form** and an **Admin Dashboard** using **React.js** for the frontend, **Node.js** for the backend, and **MongoDB** for data storage. The application allows users to submit their details and upload multiple images, while admins can view submitted data in a structured format.

---

## **Features**

### **User Submission Form**
1. Allows users to:
   - Enter their name.
   - Enter their social media handle.
   - Upload multiple images using a file input.
2. Submits data to the MongoDB database when the "Submit" button is clicked.
![User Submission Form Screenshot](../social_media_task/frontend/public/image/screencapture-localhost-3000-2025-01-18-12_25_55.png)


### **Admin Dashboard**
1. Displays all submissions fetched from the MongoDB database.
2. Shows:
   - User's name.
   - Social media handle.
   - Uploaded images as thumbnails or clickable links.
3. Dynamically updates as new submissions are added.
![Admin Dashboard Example](../social_media_task/frontend/public/image/screencapture-localhost-3000-dashboard-2025-01-18-12_28_24.png)

---

## Application Links

1. **Submit Form**
   - **URL**: [Submit Form](https://social-media-task-eta.vercel.app/)
   - **Description**: This interface allows users to fill out and submit their details for the social media task.

2. **Dashboard**
   - **URL**: [Dashboard](https://social-media-task-bz2njve18-sandiguptas-projects.vercel.app/dashboard)
   - **Description**: This dashboard provides an overview of all submitted user details and includes management functionalities.

---

## Features

### Submit Form
- Intuitive and user-friendly form interface.
- Real-time validation for accurate data entry.
- Designed for seamless submission of user details.

### Dashboard
- Displays submitted user data in a tabular format.
- Features sorting and filtering capabilities for efficient data management.
- Admin-friendly design for easy navigation and usage.

---

## How to Use

### 1. Submit Form
   - Navigate to the [Submit Form](https://social-media-task-eta.vercel.app/).
   - Enter the required details in the provided fields.
   - Click the **Submit** button to save the details.

### 2. Dashboard
   - Open the [Dashboard](https://social-media-task-bz2njve18-sandiguptas-projects.vercel.app/dashboard).
   - Review submitted user details in a structured table.
---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (or the database integrated for data storage)
- **Deployment**: Vercel(frontend) render(backend)
---

## **Project Structure**

### **Frontend**
- Built with React.js.
- Contains the following components:
  1. **SubmissionForm.js**: The form interface for users to submit their details and upload images.
  2. **AdminDashboard.js**: Displays all user submissions in a tabular format with thumbnails for uploaded images.

### **Backend**
- Built with Node.js and Express.js.
- Contains:
  1. **server.js**: Main entry point for the backend.
  2. **routes/submissionRoutes.js**: Defines routes for handling form submissions and fetching data.
  3. **controllers/submissionController.js**: Contains logic to save data to the database and retrieve submissions.
  4. **models/Submission.js**: Defines the Mongoose schema for storing user submissions in MongoDB.

---

## **Step-by-Step Guide to Run the Project**

### **Backend Setup**
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   - Create a `.env` file in the backend directory.
   - Add the following:
   ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://sanditech24:8XDopeuit8t85ofD@socialmedia.b5qq8.mongodb.net/socialMedia
    UPLOAD_DIR=uploads
   ```
4. **Start the backend server**:
   ```bash
   npm start
   ```
   - The backend server will run on `http://localhost:5000`.

### **Frontend Setup**
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend server**:
   ```bash
   npm start
   ```
   - The frontend application will run on `http://localhost:3000`.

### **Connecting Frontend and Backend**
- Ensure both servers are running.
- The frontend will automatically send requests to the backend at `http://localhost:5000`.

---

## **Backend Components Explained**

### **1. server.js**
- The main entry point for the backend.
- Sets up the Express server and connects to MongoDB using Mongoose.
- Uses middleware to parse JSON requests.
- Routes API requests to the appropriate controller.

### **2. routes/submissionRoutes.js**
- Defines the following routes:
  - `POST /api/submissions`: For handling form submissions.
  - `GET /api/submissions`: For fetching all user submissions.

### **3. controllers/submissionController.js**
- Implements the logic for:
  - **Saving Submissions**: Extracts user data and images from the request and saves them to MongoDB.
  - **Fetching Submissions**: Retrieves all data from the database and sends it to the frontend.

### **4. models/Submission.js**
- Defines the MongoDB schema using Mongoose.
- Fields:
  - `name`: String (required).
  - `socialMediaHandle`: String (required).
  - `images`: Array of image URLs (required).

---

## **Frontend Components Explained**

### **1. SubmissionForm.js**
- A form component with inputs for:
  - Name.
  - Social Media Handle.
  - Multiple image uploads.
- Sends data to the backend API using `axios`.

### **2. AdminDashboard.js**
- Fetches user submissions from the backend API.
- Displays submissions in a table with:
  - User name.
  - Social media handle.
  - Uploaded images as thumbnails.
- Uses `useEffect` to update dynamically.

---

## **Run the Full Application**
1. Start both the frontend and backend servers.
2. Open your browser and go to `http://localhost:3000` for the User Submission Form.
3. Open `http://localhost:3000/admin` (or a specific route) for the Admin Dashboard.

---


