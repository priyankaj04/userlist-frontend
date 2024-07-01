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


## Outputs

<img width="809" alt="Screenshot 2024-07-01 at 4 46 07 AM" src="https://github.com/priyankaj04/userlist-frontend/assets/103273242/c0e94b15-efcd-4c7a-8649-2c3210cfde91">
<img width="687" alt="Screenshot 2024-07-01 at 4 45 49 AM" src="https://github.com/priyankaj04/userlist-frontend/assets/103273242/aff719d6-e484-439d-8364-43d8167841fc">
<img width="748" alt="Screenshot 2024-07-01 at 4 45 37 AM" src="https://github.com/priyankaj04/userlist-frontend/assets/103273242/ff11c39a-4901-4a38-8fda-2a98501d2de2">
<img width="946" alt="Screenshot 2024-07-01 at 4 45 25 AM" src="https://github.com/priyankaj04/userlist-frontend/assets/103273242/7fa1748c-4d08-4d7d-a2a1-2d5908b08f87">
<img width="994" alt="Screenshot 2024-07-01 at 4 37 27 AM" src="https://github.com/priyankaj04/userlist-frontend/assets/103273242/40935a4d-7a05-49a9-b180-10df966ee4b6">

### Thankyou