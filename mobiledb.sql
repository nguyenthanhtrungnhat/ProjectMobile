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
CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique transaction ID
    customerId INT NOT NULL,                  -- Reference to the customer
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Update timestamp
    FOREIGN KEY (customerId) REFERENCES customer(id) -- Foreign key to customer table
);
CREATE TABLE transaction_product (
    transactionId INT NOT NULL,               -- Reference to the transaction
    productId INT NOT NULL,                   -- Reference to the product
    quantity INT NOT NULL DEFAULT 1,          -- Quantity of the product in the transaction
    PRIMARY KEY (transactionId, productId),   -- Composite primary key
    FOREIGN KEY (transactionId) REFERENCES transaction(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER update_total_spent
AFTER INSERT ON transaction_product
FOR EACH ROW
BEGIN
  UPDATE customer c
  SET c.totalSpent = (
    SELECT SUM(p.price * tp.quantity)
    FROM transaction_product tp
    JOIN products p ON tp.productId = p.id
    JOIN transaction t ON tp.transactionId = t.id
    WHERE t.customerId = c.id
  )
  WHERE c.id = (SELECT t.customerId FROM transaction t WHERE t.id = NEW.transactionId);
END;

//

DELIMITER ;

INSERT INTO transaction (id, customerId) VALUES
    (1, 1),
    (2, 2);
INSERT INTO transaction_product (transactionId, productId, quantity) VALUES
    (1, 1, 1),
    (1, 2, 2),
    (2, 2, 1), 
    (2, 3, 3); 



