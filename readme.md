# Password Reset

## Password Reset Back End

Back End api for email password authentication.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Documentation URL](#documentation-url)

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: ODM library for MongoDB.
- **Nodemailer**: Module for sending emails.
- **JWT (jsonwebtoken)**: For secure authentication.

## Installation

1. **Clone the repository**:

   ```bash
    git clone https://github.com/Vijay-Nataraj/Password-Reset-Back-End.git


   ```

2. **Navigate to the project directory**:

   ```bash

       cd Password-Reset-Back-End

   ```

3. **Install the dependencies**:

   ```bash

       npm install

   ```

4. **Set up environment variables in a .env file**:

   ```bash

        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        PORT=your_port_number
        EMAIL_USER=your_email_username
        EMAIL_PASS=your_email_password
        NODE_EN===your_node_en

   ```

5. **Start the server**:

   ```bash

        npm start

   ```

## API Endpoints

**User Registration**

- Endpoint: `/api/v1/register`

- Method: `POST`

- Description: Register a new user

- Request Body:

  ```json
  {
    "username": "username",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- Response:

  - Success: `200 OK`

    ```json
    {
      "message": "User registered successfully"
    }
    ```

  - Error: `400 Bad Request`

    ```json
    {
      "message": "E11000 duplicate key error collection: Password_Reset.users index: email_1 dup key: { email: \"user@example.com\" }"
    }
    ```

**User Login**

- Endpoint: `/api/v1/login`

- Method: `POST`

- Description: Logs in an existing user.

- Request Body:

  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- Response:

  - Success: `200 OK`

    ```json
    {
      "message": "Login successful",
      "token": "jwt-token-here"
    }
    ```

  - Error: `400 Bad Request`

    ```json
    {
      "error": "Invalid credentials"
    }
    ```

**Forgot Password**

- Endpoint: `/api/v1/forgot-password`

- Method: `POST`

- Description: Sends a password reset link to the user's email.

- Request Body:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- Response:

  - Success: `200 OK`

    ```json
    {
      "message": "Password reset link sent successfully"
    }
    ```

  - Error: `400 Bad Request`

    ```json
    {
      "message": "User not found"
    }
    ```

**Reset Password**

- Endpoint: `/api/v1/reset-password/:token`

- Method: `POST`

- Description: Resets the user's password using the token.

- Request Body:

  ```json
  {
    "password": "newsecurepassword"
  }
  ```

- Response:

  - Success: `200 OK`

    ```json
    {
      "message": "Password has been updated"
    }
    ```

  - Error: `400 Bad Request`

    ```json
    {
      "message": "Password reset token is invalid or has expired"
    }
    ```

## Error Handling

Proper error handling is implemented to ensure meaningful error messages are returned for various scenarios (e.g., invalid credentials, User not found).

## Documentation URL

[POSTMAN API Documentation URL: ](https://documenter.getpostman.com/view/40014100/2sAYQZJCFq)
