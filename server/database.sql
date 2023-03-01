CREATE DATABASE jwttutorial;

-- Set extention to use uuid_generate_v4() in psql qhile connected to database:
-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Insert fake users
INSERT INTO users(user_name, user_email, user_password) 
VALUES('henry', 'henryly213@gmail.com', 'kthl8822');
