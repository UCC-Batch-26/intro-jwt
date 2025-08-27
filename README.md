# Introduction to JWT Authentication

This project demonstrates JSON Web Token (JWT) authentication using Express.js. JWT is a compact, URL-safe means of representing claims between two parties, commonly used for securing web applications and APIs.

## What is JWT?

JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWTs are commonly used for:

1. **Authentication**: After a user logs in, subsequent requests include the JWT, allowing access to routes and resources
2. **Information Exchange**: Securely transmitting information between parties
3. **Stateless Authorization**: No need to store session information on the server

### JWT Structure

A JWT consists of three parts separated by dots (`.`):

1. **Header**: Contains the type of token and signing algorithm
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```
2. **Payload**: Contains the claims (user data and metadata)
   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "exp": 1516239022
   }
   ```
3. **Signature**: Ensures the token hasn't been tampered with

### Benefits of JWT

- **Stateless**: No session storage needed on the server
- **Cross-domain/CORS**: Can be used across different domains
- **Compact**: Can be sent through URL, POST parameter, or HTTP header
- **Self-contained**: Contains all necessary user information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or your preferred package manager
- Basic understanding of REST APIs

### Installation

1. Clone the repository
2. Install the dependencies by running:

```bash
npm install
```

This will install required packages:

- `express`: Web framework for Node.js
- `bcrypt`: Password hashing library
- `jsonwebtoken`: JWT implementation for Node.js
- `body-parser`: Request body parsing middleware
- `mongoose`: MongoDB ODM for data storage

### Development

Start the development server:

```bash
npm run dev
```

Features enabled in development mode:

- Debug mode with `--inspect` flag
- Auto-restart on file changes with `--watch` flag
- JWT token validation middleware
- Secure password hashing with bcrypt

## Project Structure

```
intro-jwt/
├── index.js              # Main application entry point
├── modules/
│   ├── auth/            # Authentication related code
│   │   ├── controller.js # JWT generation and validation
│   │   └── middleware.js # JWT middleware
│   └── users/           # User management
├── models/              # Database models
└── routes/             # API routes
```

## API Endpoints

### Authentication Endpoints

- `POST /auth/register`: Register a new user
  ```json
  {
    "username": "user@example.com",
    "password": "securepassword"
  }
  ```
- `POST /auth/login`: Login and receive JWT
  ```json
  {
    "username": "user@example.com",
    "password": "securepassword"
  }
  ```

### Protected Routes

To access protected routes, include the JWT in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Security Best Practices

1. Store JWTs securely (preferably in HTTP-only cookies)
2. Use appropriate token expiration times
3. Implement refresh token rotation
4. Never store sensitive data in JWT payload
5. Use strong secret keys for JWT signing
