
#FULL  AUTHENTICATION JWT API WITH EXPRESS JS

This project is a basic email password authentication system built with Node.js and MongoDB. It provides essential user management functionality, including user registration, login, logout, account verification, password reset, and change password features. Email notifications are also integrated for verification, password reset, and account updates.

## Features

- **User Registration**: Allows users to register by providing their email, full name, username, and password. Sends a verification email after registration.
- **Email Verification**: A verification token is generated during signup, and users must verify their account using the token sent to their email.
- **User Login**: Authenticates users using email and password, then generates a token and stores it in cookies.
- **Logout**: Clears the authentication token from cookies.
- **Password Reset**: Users can request a password reset link via email, and reset their password using the link.
- **Change Password**: Authenticated users can change their password after providing the current password.
- **Delete Account**: Users can delete their account using their registered email.
- **Email Notifications**: Sends email notifications for account verification, password reset, password reset confirmation, and a welcome email after account verification.

## Technologies Used

- **Node.js**: Backend (express js ) framework for building the API.
- **MongoDB**: Database to store user data.
- **JWT (jsonwebtoken)**: Used for generating authentication tokens.
- **bcryptjs**: For hashing passwords securely.
- **uuid**: Generates unique tokens for password reset.
- **Email Service**: Sends verification, password reset, and notification emails.
- **Express.js**: Web framework used to handle routing and middleware.
- **Mongoose**: For modeling user data in MongoDB.

## API Endpoints

### Authentication Routes

- **POST /signup**
  - Registers a new user.
  - Sends a verification email after successful registration.
  - Request body: `{ "email": "user@example.com", "password": "yourPassword", "fullname": "John Doe", "username": "johndoe" }`

- **POST /login**
  - Logs in an existing user.
  - Request body: `{ "email": "user@example.com", "password": "yourPassword" }`

- **POST /logout**
  - Logs out the user by clearing the authentication token.

- **POST /delete_account**
  - Deletes a user's account.
  - Request body: `{ "email": "user@example.com" }`

- **POST /verifiedToken**
  - Verifies a user's email with the verification token.
  - Request body: `{ "token": "12345" }`

### Password Reset Routes

- **POST /reset_password**
  - Sends a password reset link to the user's email.
  - Request body: `{ "email": "user@example.com" }`

- **POST /confirm-reset-password/:token**
  - Resets the password using the token from the reset link.
  - Request body: `{ "password": "newPassword" }`

- **POST /change_password**
  - Changes the password for a logged-in user.
  - Request body: `{ "old_password": "yourOldPassword", "password": "newPassword" }`

### User Data

- **GET /get_data**
  - Retrieves user data (except password and some sensitive information).

## Installation

1. Clone the repository:
    ```bash
    https://github.com/bytebrain3/expressjs-jwt-auth-with-email-system.git
    ```

2. Navigate to the project directory:
    ```bash
    cd expressjs-jwt-auth-with-email-system
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file:
    ```
    DATABASE_URL = "mongodb_databaseUrl"
    PORT = 3000
    JWTSECRET = 494C4F5645594F5556554D494A414E414D52
    NODE_ENV = development
    SENDER_EMAIL = "email address"
    EMAIL_PASSWORD = "email password"
    JWTSECRET_REFRESH =6d796c69666569746e6f7477696c6c626572656672657368616761696e69616d676f6e6164656976657279736f6f6d
    BACKENDURL = "https://whatshouldido.com"

    ```

5. Start the server:
    ```bash
    npm run dev
    ```

6. The API will be available at `http://localhost:8000`.

## Dependencies

- **bcryptjs**: For hashing passwords.
- **jsonwebtoken**: For JWT token generation.
- **uuid**: For generating unique password reset tokens.
- **express**: Web framework.
- **mongoose**: MongoDB ODM.
- **nodemailer**: For sending emails.

## License

This project is licensed under the MIT License.

