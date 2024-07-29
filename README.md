# Transaction Data Visualization Web App

This web app visualizes transaction data from an API in table, pie chart, and bar chart formats.

## Features

- Displays data in table format
- Visualizes data using pie and bar charts
- Easy to set up and run

## Technologies Used

### Backend

- Express.js with Node.js
- MongoDB with Mongoose
- dotenv for environment variables

### Frontend

- React.js
- Chart.js and react-chartjs-2 for charts
- Axios for API calls

## Installation

### Clone the Repository

Create a .env file in the root of your project and add your MongoDB Atlas URI and port number:
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000

Install dependancies
"npm install" for backend
the change the directory
"cd frontend" and then install react dependencies using …
[5:28 pm, 29/7/2024] Pratik More: # Transaction Data Visualization Web App

This web app visualizes transaction data from an API in table, pie chart, and bar chart formats.

## Features

- Displays data in table format
- Visualizes data using pie and bar charts
- Easy to set up and run

## Technologies Used

### Backend

- Express.js with Node.js
- MongoDB with Mongoose
- dotenv for environment variables

### Frontend

- React.js
- Chart.js and react-chartjs-2 for charts
- Axios for API calls

## Installation

### Clone the Repository

Create a .env file in the root of your project and add your MongoDB Atlas URI and port number:
MONGO_URI=<your-mongodb-atlas-uri> (or you can use mine)
PORT=5000

Install dependancies
"npm install" for backend
the change the directory
"cd frontend" and then install react dependencies using "npm install"

Make sure to start both the frontend and backend servers before using the application.
to run the servers type "npm run dev" in both ends.

Make sure that backend is running on port:5000

After the frontend starts visit the port no 3000 to see the Dashoard.

Project Structure
The project is divided into separate folders for the frontend and backend to keep the structure organized and simple.

Backend
Express.js with Node.js and MongoDB
Includes routes for handling API requests
Uses Mongoose for MongoDB interactions

Frontend
React.js for building the user interface
Chart.js and react-chartjs-2 for rendering charts
Axios for making API calls

Styling
Minimal styling is applied using inline styles for simplicity and to save time
