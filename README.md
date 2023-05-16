# menu-ab-web

This repository contains the frontend for our senior team project, MenuLab, a menu editor and tester. 

<br />

## Table of Contents
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Sources](#sources)
- [Contributing](#contributing)

<br />

## Background

MenuLab consists of two repositories:

1. Backend - [menu-ab-api](https://github.com/sfdevshop/menu-ab-api)
2. Frontend - [menu-ab-web](https://github.com/sfdevshop/menu-ab-web)

This repository is the frontend. 

It mostly consists of react components for the user interface. There is some code to handle the checking of user authentication and storing the JWT.

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

1. Clone the repository and go to ```menu-ab-web/client-next```

2. Install dependencies: ```npm install```. 

3. Create a file called `.env.local` in ```menu-ab-api/server``` with the following: 
    ```
    NEXTAUTH_SECRET = YOUR_NEXTAUTH_SECRET
    NEXT_PUBLIC_API_PORT = YOUR_API_PORT
    ```
8. Run: ```npm run dev```

<br />

## Usage
To experiment as a test user (if using Amazon RDS database)

Test User:
- Email: ```test@email.com```
- Password: ```test```

1. With the frontend and backend running, navigate to Navigate to http://localhost:3000/login

2. Login using the test user credentials

3. You will be redriected to the dashboard where you can navigate to the different pages, like the menu editor:

![MenuLab Editor Page](https://github.com/sfdevshop/menu-ab-web/assets/60046785/c1a86571-6b0b-4bfb-a748-e4495f1c62b4)

<br />


<br />

## Sources

- We used this todo-list app tutorial to as a foundation for our frontend: 

    - Title: [Learn JWT with the PERN stack by building a Registration/Login system](https://www.youtube.com/watch?v=5vF0FGfa0RQ)


- Since this project is using NextJS 13, we followed [Taxonomy](https://github.com/shadcn/taxonomy), a notetaking app built using Next and React, as an example.



- For avoiding full page reloads, we followed React's official [state management documentation](https://react.dev/learn/managing-state).


<br />

## Contributing

No contributions accepted at this time. 
