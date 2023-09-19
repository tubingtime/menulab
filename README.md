# Menulab

This repository contains the frontend and backend for MenuLab, a menu editor and tester. 

<br />

## Table of Contents
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Database](#database)
- [Known Bugs](#known-bugs)
- [Sources](#sources)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Future Work](#future-work)

<br />

## Background

MenuLab consists of the **frontend** and **backend**.

The **frontend** is made with React and NextJS and mostly consists of react components for the user interface. There is some code to handle the checking of user authentication and storing the JWT.

The **backend** contains the user authentication and authorization logic, CRUD APIs for creating and managing a menu, APIs for uploading and managing photos, and the schema for the postgreSQL database.

This diagram gives an overview of our technical architecture:
![MenuLab Design Overview](https://github.com/sfdevshop/menu-ab-web/assets/60046785/4db79e50-5800-4a82-be7d-db214ba77dfc)


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

### Client

1. Clone the repository and go to ```menu-ab-web/client```

2. Install dependencies: ```npm install```. 

3. Create a file called `.env.local` in ```menu-ab-api/server``` with the following: 
    ```
    NEXTAUTH_SECRET = YOUR_NEXTAUTH_SECRET
    NEXT_PUBLIC_API_PORT = YOUR_API_PORT
    ```
8. Run: ```npm run dev```

### Server
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

5. Install Postman for the purpose of testing backend.

6. Install dependencies: ```npm install``` OR ```npm i express cors pg jsonwebtoken bcrypt dotenv```. 

7. Create a file called `.env` in ```menu-ab-api/server``` with the following: 
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
8. Run.
    - Option 1: Run ```node index.js```.
    - Option 2: Install nodemon ```npm install -g nodemon``` and then run nodemon ```nodemon```.

<br />

<br />

## Usage

### Client
To experiment as a test user (if using Amazon RDS database)

Test User:
- Email: ```test@email.com```
- Password: ```test```

1. With the frontend and backend running, navigate to Navigate to http://localhost:3000/login

2. Login using the test user credentials

3. You will be redriected to the dashboard where you can navigate to the different pages, like the menu editor:

![MenuLab Editor Page](https://github.com/sfdevshop/menu-ab-web/assets/60046785/c1a86571-6b0b-4bfb-a748-e4495f1c62b4)

### Server

To experiment as a test user (if using Amazon RDS database)
Test User:
- Name: ```test```
- Email: ```test@email.com```
- Password: ```test```
- UUID: ```9aafde03-6b1b-44a7-aa41-55339f5a1d3b```

1. Login with test credentials using Postman and get the user token (see jwtAuth.js for Login route).
<img width="793" alt="Screen Shot 2023-05-11 at 10 33 24 AM" src="https://github.com/sfdevshop/menu-ab-api/assets/71528749/cb39d766-416b-41c1-ae08-18f35553ba4a">

2. Test any of the routes by going to jwtAuth.js or dashboard.js.

3. Test any of the APIs in dashboard.js.

4. Optional: Set up the menu-ab-web repository.

<br />

## Database

This project uses a PostgreSQL database hosted on Amazon RDS (Relational Database Service). 

The database schema is located at ```/server/database.sql```. 

Here is an overview of the database schema:

![LogicalDataModel2](https://github.com/sfdevshop/menu-ab-api/assets/71528749/00ff2ec2-91a6-4afc-adeb-895ee72f85b9)

<br />

## Known Bugs
- Frontend does not perform sufficient validation.
- AssignTo requires a manual refresh.
- JWTSecret should expire more frequently.
- There are possible security vulnerabilities in terms of our Amazon RDS server authentication method.

<br />

## Sources

- We used this todo-list app tutorial to as a foundation for our frontend: 

    - Title: [Learn JWT with the PERN stack by building a Registration/Login system](https://www.youtube.com/watch?v=5vF0FGfa0RQ)


- Since this project is using NextJS 13, we followed [Taxonomy](https://github.com/shadcn/taxonomy), a notetaking app built using Next and React, as an example.



- For avoiding full page reloads, we followed React's official [state management documentation](https://react.dev/learn/managing-state).


- We used this tutorial to as a foundation for our server:
Title: Learn JWT with the PERN stack by building a Registration/Login system
YouTubeChannel: The Stoic Programmers on YouTube
    - Part 1: https://www.youtube.com/watch?v=7UQBMb8ZpuE&t=235s
    - Part 2: https://www.youtube.com/watch?v=cjqfF5hyZFg


<br />

## Contributing

### Client

To add a new component to the frontend
1. Create a new branch such as ```feat/add-menus```.
2. Create a new file in the componenents directory ```/client-next/src/components/AddMenus.tsx```.
3. Write the React code for your component. If there's a similar component, copy that one and base your new one off of it. If your component needs to make API calls, you will need to get the user's JWT with `useToken()`.  If your component is making updates to shared state, such as the list of menus, you will need to use the dispatch function to tell React to update the state. See `AddMenu.tsx` for an example of how to do this.
4. Add your component to the page you want it on. If you wanted your component on the main dashboard page, navigate to ```/client-next/src/app/dashboard/page.tsx``` and add `<AddMenus />` in the return statement of the Dashboard function. If you want your component on a new page, add a new directory in the `/app` directory with your page's name. In youe new directory, add a `page.tsx` file with your React code. For more information on the `/app` directory, see the [NextJS documentation](https://nextjs.org/docs/app/building-your-application/routing#the-app-directory)
6. Run the app and test your component.
7. Create a pull request for your changes and wait for review.
8. Once your code passes review, it can be merged into main.

### Server

Adding new API routes to the server is simple.
1. Create a new branch such as ```feat/get_section_ids```.
2. Navigate to ```/server/routes/dashboard.js```.
3. Write a new API for the component that you would like to add ex. GET request for getting all the section ids.
4. Test the component in Postman.
5. Push your work to the repository and wait for review.
6. Once your code passes review, it can be merged into main.

<br />

## Future Work

### Client

- Use drag and drop for moving menu items around to different sections and positions
- Have data visualization graphs reflect real POS data
- Choose what items you want to make a visualization for
- Use DoorDash or UberEats APIs to connect menus created on these apps to menus created on MenuLab.
- More custom styling


### Server
- Create a backend API that allows the user to upload POS (Point of Sale data).
- Process POS data.
- Generate insights and recommendations based on POS data.
- Use DoorDash or UberEats APIs to connect menus created on these apps to menus created on MenuLab.


## Documentation

- **pern_stack.md** - Contains links to the official documentation for different
parts of the PERN stack including postgreSQL, Express, React, Node.js, npm, nodemon, Postman.

- **jwt_summary.md** - Contains a summary about JWT tokens, authentication v. authorization,
and an explanation of the routes and middleware.

- **common_postgres.md** - Contains a list of common SQL and psql commands.

- **git-worflow.md** - Describes how to work on the project. 

<br />




