CREATE DATABASE play_menu;

-- Set extention to use uuid_generate_v4() in psql qhile connected to database:
CREATE extension IF NOT EXISTS 'uuid-oosp';

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE menus (
  menu_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE sections (
  section_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  menu_id INTEGER REFERENCES menus(menu_id) ON DELETE CASCADE;

CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  photo_reference TEXT
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE menu_assignments (
  menu_assignment_id SERIAL PRIMARY KEY,
  menu_id INTEGER REFERENCES menus(menu_id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE
);


CREATE TABLE section_assignments (
  assignment_id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES sections(section_id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE
);

CREATE TABLE images (
  title VARCHAR(255) NOT NULL,
  cloudinary_id VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (cloudinary_id)
);



-- Insert fake users.
INSERT INTO users(user_name, user_email, user_password) 
VALUES('henry', 'henryly213@gmail.com', '');
-- uuid created for this user: c92ceab4-cb45-4332-bc08-da22e5b92049 
INSERT INTO users(user_name, user_email, user_password) 
VALUES('bilbo', 'corgi@gmail.com', '');
-- uuid created for this user: 5735cb39-9b24-484c-afb4-fe8e770b643f

-- Insert two menus.
INSERT INTO menus(name, user_id) 
VALUES('Breakfast Club Weekday', '5bde0820-9ad8-4cb5-a082-6eb6b6bf8508');
INSERT INTO menus(name, user_id) 
VALUES('Breakfast Club Weekend Brunch', '5bde0820-9ad8-4cb5-a082-6eb6b6bf8508');

-- Insert sections for each menu.
-- menu_id == 1 for 'Breakfast Club Weekday'
INSERT INTO sections(name, menu_id) 
VALUES('Pancakes', 1);
INSERT INTO sections(name, menu_id) 
VALUES('Breakfast Sandwiches & Burritos', 1); 
INSERT INTO sections(name, menu_id) 
VALUES('Eggs', 1); 
INSERT INTO sections(name, menu_id) 
VALUES('Sides', 1); 

-- menu_id == 2 for 'Breakfast Club Weekend Brunch'
INSERT INTO sections(name, menu_id) 
VALUES('Cocktails', 2);
INSERT INTO sections(name, menu_id) 
VALUES('Starters', 2); 
INSERT INTO sections(name, menu_id) 
VALUES('Brunch', 2); 
INSERT INTO sections(name, menu_id) 
VALUES('Lunch', 2); 

-- Insert menu items.
INSERT INTO items(name, description, price)
VALUES('Lemon Ricotta Pancakes', 
'Fluffy pancakes with lemon zest and a blueberry sauce', 16.99);
INSERT INTO items(name, description, price)
VALUES('Pineapple Upside Down Pancakes', 
'Pineapple pancakes with a raspberry sauce and whipped cream', 17.99);
INSERT INTO items(name, description, price)
VALUES('Three Egg Scramble', 
'Scrambled eggs, your choice of meat, your choice of potatoes', 12.99);
INSERT INTO items(name, price)
VALUES('Coffee', 1.99);
INSERT INTO items(name, price)
VALUES('Bloody Mary', 9.99);
INSERT INTO items(name, price)
VALUES('Irish Coffee', 7.99);
INSERT INTO items(name, price)
VALUES('Green Smoothie', 5.99);
INSERT INTO items(name, price)
VALUES('Orange Juice', 2.99);

-- menu_id == 1 for 'Breakfast Club Weekday'
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(1, 1); 
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(1, 3);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(1, 4);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(1, 7);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(1, 8);

-- menu_id == 2 for 'Breakfast Club Weekend Brunch'
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 1);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 2);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 3);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 4);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 5);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 6);
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES(2, 8);

INSERT INTO section_menu_item_assignments(section_id, item_id) 
VALUES(1, 1); -- 'Pancakes', 'Lemon Ricotta Pancakes'
INSERT INTO section_menu_item_assignments(section_id, item_id) 
VALUES(3, 3); -- 'Eggs', 'Three Egg Scramble'
INSERT INTO section_menu_item_assignments(section_id, item_id) 
VALUES(4, 5); -- 'Cocktails', 'Bloody Mary'
INSERT INTO section_menu_item_assignments(section_id, item_id) 
VALUES(4, 6); -- 'Cocktails', 'IrishCoffee'

-- Sample queries
-- Create a new Menu. 
INSERT INTO menus(name, user_id) 
VALUES('High Tea Society', '5735cb39-9b24-484c-afb4-fe8e770b643f');

-- Create a new MenuItem.
INSERT INTO items(name, description, price)
VALUES('Lavendar Earl Grey Latte', 
'Our twist on the Picard favorite.', 3.99);

INSERT INTO items(name, description, price)
VALUES('Cardamom Tea', 
'A black tea prepared in the Yemeni tradition.', 2.99);

-- Assign a MenuItem to a Menu.
INSERT INTO menu_assignments(menu_id, item_id) 
VALUES((SELECT menu_id FROM menus WHERE menu_id = 'High Tea Society'), 
(SELECT item_id FROM items WHERE item_id = 'Lavendar Earl Grey Latte')); 

INSERT INTO menu_assignments(menu_id, item_id) 
VALUES((SELECT menu_id FROM menus WHERE name = 'High Tea Society'), 
(SELECT item_id FROM items WHERE name = 'Cardamom Tea')); 

-- Delete a MenuItem by name.
DELETE FROM items
WHERE name = 'Lavendar Earl Grey Latte';

-- Delete a Menu by name.
DELETE FROM menus
WHERE name = 'High Tea Society';

-- Return all the MenuItems in a Menu.
SELECT mi.*
FROM menus m
JOIN menu_assignments ma ON m.menu_id = ma.menu_id
JOIN items mi ON ma.item_id = mi.item_id
WHERE m.name = 'High Tea Society';

-- Return all the sections in a menu.
-- Return all the menu items in a section of a menu. 

-- Update a menu item description.
-- Update a menu item name.
