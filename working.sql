-- DROP DATABASE bamazon_db;
-- CREATE DATABASE bamazon_db;

USE bamazon_db;

-- CREATE TABLE products (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(50) NOT NULL,
--   department VARCHAR(50) NOT NULL,
--   price INTEGER(10),
--   stock_quantity INTEGER(10),
--   PRIMARY KEY (id)
-- );

-- INSERT INTO products (product_name, department, price, stock_quantity)
-- VALUES ("iphone Charger", "Bamazon Basics", 11, 12345),
--        ("USB Charger", "Bamazon Basics", 9, 1200),
--        ("Alexa-Siri Combo", "Bamazon Basics", 90000, 2),
--        ("Macbook", "Computers", 11, 55),
--        ("Dell XPS", "Computers", 11, 65),
--        ("Surface Pro 3", "Computers", 11, 75),
--        ("Tesla Model X", "Electric Cars", 120000, 200),
--        ("Nissan LEAF", "Electric Cars", 25999, 30),
--        ("Audi e-tron", "Electric Cars", 31099, 40),
--        ("Fisker Karma", "Electric Cars", 120001, 5);

SELECT * FROM products;
