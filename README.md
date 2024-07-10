# React-Notification

## Overview
This project is a simple notification application built with React for the front end and Spring Boot for the back end. The application demonstrates how to use WebSockets to send and receive real-time notifications.

## Features
- Real-time notifications using WebSocket and STOMP protocol
- Secure communication with HTTPS
- Simple and clean user interface with React

## Technologies Used
- **Front End**: React, STOMP.js, SockJS
- **Back End**: Spring Boot, Spring WebSocket, Spring Security
- **Build Tools**: Maven

## Prerequisites
- **Java 11 or later**
- **Node.js and npm**
- **Maven**

## Getting Started

### Clone the Repository
```sh
git clone https://github.com/your-username/React-Notification-Assignment.git
cd React-Notification-Assignment

### Run the Spring Boot Application
### SetUp the Front-end
- `npm install`
- `npm start`

Open your browser and navigate to http://localhost:3000


Usage:
Open the application in your browser.
Click the "Send Notification" button to test sending a notification.
Check the browser console to see the received notification.

Project Structure:
React-Notification-Assignment/
├── backend/                # Spring Boot application
│   ├── src/                # Source files
│   ├── pom.xml             # Maven configuration file
│   └── ...                 # Other backend files
├── frontend/               # React application
│   ├── src/                # Source files
│   ├── package.json        # npm configuration file
│   └── ...                 # Other frontend files
└── README.md               # Project documentation


Troubleshooting
Issue: WebSocket connection not established.

Solution: Ensure the Spring Boot application is running and accessible at https://localhost:8443.
Issue: CORS errors.

Solution: Ensure CORS is properly configured in the Spring Boot application.
