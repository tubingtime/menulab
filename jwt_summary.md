# What is JWT?

## Authentication v. Authorization
- **Authentication** is the process of checking that you are the person you claim to be.
Think of authentication as getting your passport checked see if you are you.

- **Authorization** is the process of checking what you are able to do as a specific user.  
Think of authorization as getting a wristband for being 21+ in order access a venue.
The JWT token gives our user authorization.

<br />

## JWT

JWT encodes a token that can be decoded into three parts:
- **Header** - The header contains the algorithm (how the signature was signed) and the token type.
- **Payload** - The payload contains the data.
- **Verify Signature** - Takes the base64UrlEncode(header) + base64UrlEncode(payload) + a secret key (hidden in the backend application)

<br />

This is not intended for security or sharing "secret" information. 
This is used to pass objects more easily.

<br />

# Application Overview

## Server
Contains middleware, utils, jwtGenerator.
jwt Generator returns the payload, jwtSecret, and an expiration date.

Routes contain: 
- ```jwtAuth.js``` (Contain register, login, and verify.)
- ```dashboard.js```.

Password is encrypted and inserted into database in encrypted form.
Login is similar and generates a token as well.
authorize.js checks whether the token exists.

<br />

## Middleware

The middleware in this project consists of:
- ```validInfo.js``` - validates the email and checks that the rest of the credentials are complete.
- ```authorization.js``` - checks that the token is valid. Anytime you refresh a React application, the state is reset. Without this middleware, we would need to login everytime we refresh.
