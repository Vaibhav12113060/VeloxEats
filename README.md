# VeloxEats

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
</p>

A modern and efficient food delivery application.

## Project Overview

VeloxEats is a full-stack web application designed to streamline the food ordering process, connecting users with their favorite local restaurants. This project is built using a modern technology stack to ensure a responsive, scalable, and user-friendly experience.

## Project Structure

The project is organized into two main directories: `Frontend` and `Backend`.

### Frontend

The frontend is a single-page application (SPA) built with React.

```
/Frontend
|-- /node_modules
|-- /public
|   |-- index.html
|   `-- ...
|-- /src
|   |-- /assets
|   |-- /components
|   |-- /pages
|   |-- /services
|   |-- App.js
|   |-- index.js
|   `-- ...
|-- package.json
`-- ...
```

- **`public/`**: Contains the main HTML file and static assets like images and fonts.
- **`src/`**: Contains the main application source code.
  - **`assets/`**: Static assets to be bundled with the application.
  - **`components/`**: Reusable UI components (e.g., Buttons, Cards, Modals).
  - **`pages/`**: Top-level page components corresponding to different routes (e.g., Home, RestaurantDetails, Cart).
  - **`services/`**: Modules for handling API calls and other business logic.
  - **`App.js`**: The root component of the application, handling routing.
  - **`index.js`**: The entry point for the React application.

### Backend

The backend is a Node.js application using the Express framework to provide a RESTful API.

```
/Backend
|-- /node_modules
|-- /src
|   |-- /config
|   |-- /controllers
|   |-- /models
|   |-- /routes
|   |-- /services
|   |-- /utils
|   |-- app.js
|   `-- server.js
|-- package.json
`-- ...
```

- **`src/config/`**: Configuration files for the database, environment variables, etc.
- **`src/controllers/`**: Handles incoming requests, processes them, and sends back a response by calling services.
- **`src/models/`**: Defines the database schemas (e.g., User, Restaurant, Order).
- **`src/routes/`**: Defines the API endpoints and maps them to the appropriate controllers.
- **`src/services/`**: Contains the core business logic of the application.
- **`src/utils/`**: Utility functions used across the application.
- **`app.js`**: The main Express application file where middleware and routes are configured.
- **`server.js`**: The entry point for the backend server, responsible for starting the server.

## Technologies & Frameworks

### Core Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

### Key Libraries & Tools

- **Frontend**:
  - **Styling**: Tailwind CSS for a utility-first CSS framework.
  - **API Communication**: Axios for making HTTP requests to the backend.
- **Backend**:
  - **Database ODM**: Mongoose for interacting with MongoDB.
  - **Authentication**: JSON Web Tokens (JWT) for securing API endpoints.
  - **Validation**: A library like Joi or express-validator for request validation.

## Planning & Future Features

The development is planned in several phases:

1.  **Foundation & User Management:**
    - [x] Setup project structure for Frontend and Backend.
    - [ ] Implement User model, authentication (signup/login), and JWT generation.
    - [ ] Create protected routes.

2.  **Restaurant & Menu Functionality:**
    - [ ] Implement Restaurant and MenuItem models.
    - [ ] API endpoints for fetching restaurants and their menus.
    - [ ] Frontend pages to display restaurant listings and individual menu pages.

3.  **Ordering & Cart System:**
    - [ ] Implement a shopping cart on the frontend.
    - [ ] Create Order model and API endpoints for placing and retrieving orders.
    - [ ] User order history page.

4.  **Advanced Features:**
    - [ ] Payment gateway integration (e.g., Stripe, Razorpay).
    - [ ] Real-time order tracking using WebSockets.
    - [ ] User profile management (update details, manage addresses).
    - [ ] Search and filter functionality for restaurants and dishes.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation & Setup

**1. Backend**

```bash
cd Backend
npm install

# Create a .env file in the Backend root and add your configuration
# Example:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

npm start
```

**2. Frontend**

```bash
cd Frontend
npm install
npm start
```

The frontend development server will start, and you can view the application at `http://localhost:3000`.
