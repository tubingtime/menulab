# menu-ab-api

# To run

1. Go to ```menu-ab-api/server```.
2. Install dependencies: ```npm i express cors pg jsonwebtoken bcrypt dotenv```. 
3. Set up database in postgres using the schema in database.sql. 
4. Launch postgres: ```psql - U postgres```.
4. Run.
    - Option 1: Run ```node index.js```.
    - Option 2: Install nodemon ```npm install -g nodemon``` and then run nodemon ```nodemon```.

<br />

# Documentation

- **pern_stack.md** - Contains links to the official documentation for different
parts of the PERN stack including postgreSQL, Express, React, Node.js, npm, nodemon, Postman.
- **jwt_summary.md** - Contains a summary about JWT tokens, authentication v. authorization,
and an explanation of the routes and middleware.
- **common_postgres.md** - Contains a list of common SQL and psql commands.

<br />

# Sources

## JWT Tutorial
We used this tutorial to as a foundation for our server:
Title: Learn JWT with the PERN stack by building a Registration/Login system
YouTubeChannel: The Stoic Programmers on YouTube
Part 1: https://www.youtube.com/watch?v=7UQBMb8ZpuE&t=235s
Part 2: https://www.youtube.com/watch?v=cjqfF5hyZFg

<br />
