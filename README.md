
# JobPortal

JobPortal is a comprehensive web application designed to connect blue-collar workers with job opportunities tailored to their skills and expertise. The platform bridges the gap between employers and job seekers, providing a seamless, reliable, and accessible experience for both parties.

## Features

- User authentication for employees and employers
- Company and job management for employers
- Job browsing, searching, and filtering for employees
- Application tracking and management
- Real-time chat between employers and employees
- Profile management for users and companies
- Responsive, modern UI built with React and Tailwind CSS

## Tech Stack

**Frontend:**
- React
- Vite
- Redux Toolkit
- Tailwind CSS
- Radix UI

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- Cloudinary (for file uploads)

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the `backend` folder:
	```sh
	cd backend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Create a `.env` file in the backend root with the following variables:
	```env
	MONGODB_URI=your_mongodb_connection_string
	JWT_SECRET=your_jwt_secret
	CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
	CLOUDINARY_API_KEY=your_cloudinary_api_key
	CLOUDINARY_API_SECRET=your_cloudinary_api_secret
	```
4. Start the backend server:
	```sh
	npm run dev
	```
	The backend will run on [http://localhost:8000](http://localhost:8000).

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
	```sh
	cd frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the frontend development server:
	```sh
	npm run dev
	```
	The frontend will run on [http://localhost:5173](http://localhost:5173).

## Usage

- Employees can sign up, browse jobs, apply, and chat with employers.
- Employers can create companies, post jobs, view applicants, and communicate with candidates.

## Folder Structure

- `backend/` - Express.js API, MongoDB models, controllers, routes, and socket server
- `frontend/` - React app, components, hooks, Redux store, and UI assets

## License

This project is licensed under the ISC License.

---
**Made with ❤️ for connecting talent and opportunity.**
