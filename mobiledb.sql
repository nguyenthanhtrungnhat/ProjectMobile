SELECT * FROM mobileproject.user;
use mobileproject;
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price FLOAT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(255) , 
  password VARCHAR(255)
);

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- auto-incrementing ID
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- automatically set to the current time when a record is created
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- automatically updated to the current time on each update
    phone INT NOT NULL,  
     totalSpent FLOAT,
    name VARCHAR(255) NOT NULL                -- customer name (change length as needed)
);
