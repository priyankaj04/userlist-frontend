# React Web App

## Overview

This repository contains the code for a React web application. The instructions below will guide you through the setup, installation, and running of the app both locally and via Docker.

## Requirements

- Backend should run on `port:8000`.
- Node.js version `v22.2.0`.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/priyankaj04/userlist-frontend.git
cd userlist-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application
```bash
npm start
```

This will start the development server on `http://localhost:3000`.

## Running through Docker

### 1. Build the Docker Image
```bash
docker build -t react-app .
```

### 2. Run the Docker Container
```bash
docker run -p 3000:3000 react-app
```
This will run the application in a Docker container, accessible at `http://localhost:3000`.

## Additional Information

* Ensure that the backend service is running on port:8000 before starting the frontend application.
* If you encounter any issues, check the Node.js and npm versions to ensure compatibility with v22.2.0.

### Thankyou