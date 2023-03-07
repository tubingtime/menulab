# menu-ab-api

# To run

1. Go to ```menu-ab-api/server```.
2. Install dependencies: ```npm install``` OR ```npm i express cors pg jsonwebtoken bcrypt dotenv```. 
3. Set up database in postgres using the schema in database.sql.
4. Create a file called `.env` in ```menu-ab-api/server``` with the following content: 
    ```
    jwtSecret=YOUR_JWT_SECRET_HERE
    user=postgres
    password=YOUR_POSTGRES_PASSWORD_HERE
    host=demo-db.cr37h0vny84t.us-east-2.rds.amazonaws.com
    postgresPort=5432
    database=initial_db
    nodePort=5001
    ```
            
6. Run.
    - Option 1: Run ```node index.js```.
    - Option 2: Install nodemon ```npm install -g nodemon``` and then run nodemon ```nodemon```.

<br />

# To experiment as a test user
Test User:
- Name: ```test```
- Email: ```test@email.com```
- Password: ```test```
- UUID: ```9aafde03-6b1b-44a7-aa41-55339f5a1d3b```

1. Login with test credentials using Postman and get the user token (see jwtAuth.js for Login route).
2. Test any of the routes by going to jwtAuth.js or dashboard.js.

# Documentation

- **pern_stack.md** - Contains links to the official documentation for different
parts of the PERN stack including postgreSQL, Express, React, Node.js, npm, nodemon, Postman.
- **jwt_summary.md** - Contains a summary about JWT tokens, authentication v. authorization,
and an explanation of the routes and middleware.
- **common_postgres.md** - Contains a list of common SQL and psql commands.
- **git-worflow.md** - Describes how to work on the project. 

<br />

# Sources

## JWT Tutorial
We used this tutorial to as a foundation for our server:
Title: Learn JWT with the PERN stack by building a Registration/Login system
YouTubeChannel: The Stoic Programmers on YouTube
Part 1: https://www.youtube.com/watch?v=7UQBMb8ZpuE&t=235s
Part 2: https://www.youtube.com/watch?v=cjqfF5hyZFg

<br />
