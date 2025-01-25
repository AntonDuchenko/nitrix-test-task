# Apartment Management System

This project is an Apartment Management System that allows users to view available apartments, as well as create, delete, and edit apartment listings. It is built with **Express.js** for the backend, **React.js** for the frontend, and uses **Mongoose** to interact with the MongoDB database. State management is handled using **Redux Toolkit** and **RTK Query**.

[Demo Link](http://13.60.54.140:5173/)

## Features

- **View Available Apartments**: Display a list of apartments with details such as name, location, price, etc.
- **Create Apartments**: Add new apartment listings to the system.
- **Edit Apartments**: Modify the details of existing apartment listings.
- **Delete Apartments**: Remove apartments from the listings.

## Technologies Used

- **Frontend**:
  - React.js
  - Material UI (MUI)
  - Redux Toolkit
  - RTK Query
- **Backend**:
  - Express.js
  - Mongoose (for MongoDB interaction)
- **Database**: MongoDB

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (locally or a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AntonDuchenko/nitrix-test-task.git
   cd nitrix-test-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the .env files:

   ```bash
   npm run init
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

## API Endpoints

- **GET /api/apartments**: Retrieve a list of all available apartments.
- **POST /api/apartments**: Add a new apartment to the system.
- **PUT /api/apartments/:id**: Edit an existing apartment's details.
- **DELETE /api/apartments/:id**: Delete an apartment from the system.

## Frontend Features

- **Apartment List**: Displays all apartments in a clean layout using **Material UI** components.
- **Create Apartment**: A form to add new apartments with fields such as name, price, location, etc.
- **Edit Apartment**: Edit existing apartment details using a form pre-populated with the current apartment data.
- **Delete Apartment**: Delete apartments with a confirmation prompt.
