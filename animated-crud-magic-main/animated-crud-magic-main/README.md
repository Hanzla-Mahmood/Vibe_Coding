
# CRUD Operations - Student Management System

A beautiful, animated web application for performing CRUD operations on student records using MongoDB, Node.js, Express.js, and React.

## Features

- **Insert**: Add new student records with validation
- **Delete**: Remove student records with confirmation dialogs
- **Update**: Search and modify existing student information
- **Show**: Display student records in an organized format
- Beautiful animated UI with background images
- Real-time MongoDB integration
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- Lucide React icons
- React Router for navigation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service on your local machine

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory and install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Database Configuration

- **Connection String**: `mongodb://localhost:27017/`
- **Database Name**: `CRUD`
- **Collection Name**: `CRUD`

## API Endpoints

- `POST /api/students` - Create a new student record
- `GET /api/students/:rollNo` - Get student by roll number
- `PUT /api/students/:rollNo` - Update student record
- `DELETE /api/students/:rollNo` - Delete student record

## Student Schema

```javascript
{
  rollNo: String (required, unique),
  name: String (required),
  department: String (required),
  semester: Number (required, 1-8),
  age: Number (required, 15-30)
}
```

## Usage

1. Start MongoDB service
2. Run the backend server: `cd server && npm run dev`
3. Run the frontend: `npm run dev`
4. Navigate to `http://localhost:5173`

Enjoy managing student records with beautiful animations and a modern interface!
