# menu-ab-api

This repository contains the backend for our senior team project, MenuLab, a menu editor and tester. 

<br />

## Table of Contents
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)

<br />

## Background

MenuLab consists of two repositories:
1. Backend - menu-ab-api
2. Frontend - menu-ab-web

This repository is the backend. 

It contains the user authentication and authorization logic, CRUD APIs for creating and managing a menu, APIs for uploading and managing photos, and the schema for the postgreSQL database.

### Core Features
1. Register and login users

2. Create and manage a menu 
- Create a new menu
- Read a menu
- Update a menu
- Delete a menu

3. Create and manage a menu section
- Create a new menu section
- Read a menu section
- Update a menu section
- Delete a menu section

4. Create and manage a menu item
- Create a new menu item
- Read a menu item
- Update a menu item
- Delete a menu item

5. Upload/delete a photo

6. Generate a menu preview



<br />

## Install

1. Install postgreSQL.
2. Set up postgres database using the schema in database.sql. Not your username, password, host, postgres port, and database name.

Check that tables are correctly installed:
```
    List of relations
 Schema |        Name         | Type  |  Owner   
--------+---------------------+-------+----------
 public | items               | table | postgres
 public | menu_assignments    | table | postgres
 public | menus               | table | postgres
 public | section_assignments | table | postgres
 public | sections            | table | postgres
 public | users               | table | postgres
(6 rows)
```

3. Set up an Cloudinary account. Note your cloud_name, api_key, and api_secret.
4. Clone this repository and go to ```menu-ab-api/server```.
5. Install dependencies: ```npm install``` OR ```npm i express cors pg jsonwebtoken bcrypt dotenv```. 
6. Create a file called `.env` in ```menu-ab-api/server``` with the following: 
    ```
    jwtSecret=YOUR_JWT_SECRET_HERE
    user=postgres
    password=YOUR_POSTGRES_PASSWORD_HERE
    host=YOUR_DATABASE_HERE
    postgresPort=YOUR_DATABASE_PORT
    database=YOUR_DATABASE_NAME
    nodePort=YOUR_LOCAL_PORT
    cloud_name=YOUR_CLOUDINARY_NAME
    api_key=YOUR_CLOUDINARY_KEY
    api_secret=YOUR_CLOUDINARY_SECRET
    ```
7. Run.
    - Option 1: Run ```node index.js```.
    - Option 2: Install nodemon ```npm install -g nodemon``` and then run nodemon ```nodemon```.

<br />

## Usage
To experiment as a test user (if using Amazon RDS database)
Test User:
- Name: ```test```
- Email: ```test@email.com```
- Password: ```test```
- UUID: ```9aafde03-6b1b-44a7-aa41-55339f5a1d3b```

1. Login with test credentials using Postman and get the user token (see jwtAuth.js for Login route).

2. Test any of the routes by going to jwtAuth.js or dashboard.js.

3. Test any of the APIs in dashboard.js.

4. Optional: Set up the menu-ab-web repository.

<br />

## Documentation

- **pern_stack.md** - Contains links to the official documentation for different
parts of the PERN stack including postgreSQL, Express, React, Node.js, npm, nodemon, Postman.
- **jwt_summary.md** - Contains a summary about JWT tokens, authentication v. authorization,
and an explanation of the routes and middleware.
- **common_postgres.md** - Contains a list of common SQL and psql commands.
- **git-worflow.md** - Describes how to work on the project. 

<br />

## Sources

### JWT Tutorial
We used this tutorial to as a foundation for our server:
Title: Learn JWT with the PERN stack by building a Registration/Login system
YouTubeChannel: The Stoic Programmers on YouTube
- Part 1: https://www.youtube.com/watch?v=7UQBMb8ZpuE&t=235s
- Part 2: https://www.youtube.com/watch?v=cjqfF5hyZFg


<br />

## Contributing

No contributions accepted at this time. 
