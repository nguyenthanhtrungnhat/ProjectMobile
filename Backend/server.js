const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
// Load environment variables from .env file
dotenv.config({ path: 'nhat.env' });

// Initialize the Express application
const app = express();


// Use bodyParser to parse incoming request bodies as JSON
app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'admin', // Replace with your MySQL password
    database: 'mobileproject',
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Generate JWT Token
function generateAccessToken(payload) {
    if (!process.env.TOKEN_SECRET) {
        throw new Error("TOKEN_SECRET is not defined in the .env file");
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
app.use(cors({
    origin: 'http://localhost:8081'  // Only allow requests from your React Native development server
}));

// Route to check if the server is working
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Authentication Route
app.post('/auth', (req, res) => {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
    }

    // Query user by phone
    const sql = 'SELECT * FROM user WHERE phone = ?';
    db.query(sql, [phone], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Directly compare plain-text passwords (not secure)
        if (password === user.password) {
            // Generate token with the user's phone as payload
            const token = generateAccessToken({ phone: user.phone });
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});
// Endpoint to get all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    // Execute SQL query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error fetching products');
            return;
        }

        // Send the query results as JSON response
        res.json(results);
    });
});
// Endpoint to get all cusotmer
app.get('/customer', (req, res) => {
    const sql = 'SELECT * FROM customer';

    // Execute SQL query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error fetching products');
            return;
        }

        // Send the query results as JSON response
        res.json(results);
    });
});

// Endpoint to get a product by id
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;  // Capture the id from the URL
    const sql = 'SELECT * FROM products WHERE id = ?';

    // Execute SQL query with the captured id
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error fetching product');
            return;
        }

        // If no product is found with the given id
        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }

        // Send the query result (product) as JSON response
        res.json(results[0]);  // This will include the imageUrl field as well
    });
});

// Endpoint to add a product with name, price, and imageUrl (optional)
app.post('/products', (req, res) => {
    const { name, price, imageUrl } = req.body;  // Capture name, price, and imageUrl from the request body

    // Validate the required fields (name and price)
    if (!name || !price) {
        return res.status(400).send('Both name and price are required');
    }

    // If imageUrl is not provided, set it to NULL
    const productImageUrl = imageUrl || null;

    // SQL query to insert a new product
    const sql = 'INSERT INTO products (name, price, imageUrl) VALUES (?, ?, ?)';

    // Execute the SQL query
    db.query(sql, [name, price, productImageUrl], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error adding product');
            return;
        }

        // Send a success response with the newly created product's ID
        res.status(201).send({ message: 'Product added successfully', productId: result.insertId });
    });
});

// Endpoint to add a customer with only name and phone
app.post('/customer', (req, res) => {
    const { name, phone } = req.body;  // Capture the name and phone from the request body

    // Validate the data
    if (!name || !phone) {
        return res.status(400).send('Both name and phone are required');
    }

    // SQL query to insert a new product
    const sql = 'INSERT INTO customer (name, phone) VALUES (?, ?)';

    // Execute the SQL query
    db.query(sql, [name, phone], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error adding product');
            return;
        }

        // Send a success response with the newly created product's ID
        res.status(201).send({ message: 'Customer added successfully', customerId: result.insertId });
    });
});
// Endpoint to edit a product's name, price, and imageUrl by id
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;  // Capture the product id from the URL
    const { name, price, imageUrl } = req.body;  // Capture the new name, price, and imageUrl from the request body

    // Validate the data
    if (!name || !price) {
        return res.status(400).send('Both name and price are required');
    }

    // Prepare SQL query to update the product details
    const sql = 'UPDATE products SET name = ?, price = ?, imageUrl = ? WHERE id = ?';

    // Execute the SQL query
    db.query(sql, [name, price, imageUrl, productId], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error updating product');
            return;
        }

        // If no rows were affected, it means the product was not found
        if (result.affectedRows === 0) {
            return res.status(404).send('Product not found');
        }

        // Send a success response
        res.status(200).send({ message: 'Product updated successfully' });
    });
});

// Endpoint to get all transactions
app.get('/transactions', (req, res) => {
    const query = `
        SELECT 
    t.id AS transactionId,
    t.createAt,
    t.updateAt,
    c.name AS customerName,
    GROUP_CONCAT(p.name SEPARATOR ', ') AS productNames, -- Combine product names
    GROUP_CONCAT(tp.quantity SEPARATOR ', ') AS quantities -- Combine quantities
FROM 
    transaction t
INNER JOIN 
    customer c ON t.customerId = c.id
INNER JOIN 
    transaction_product tp ON t.id = tp.transactionId
INNER JOIN 
    products p ON tp.productId = p.id
GROUP BY 
    t.id
ORDER BY 
    t.createAt DESC;

    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Endpoint to get a transaction by ID
app.get('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;

    const query = `
        SELECT 
            p.name AS productName,
            p.price AS productPrice,
            tp.quantity
        FROM 
            transaction_product tp
        INNER JOIN 
            products p ON tp.productId = p.id
        WHERE 
            tp.transactionId = ?
    `;

    db.query(query, [transactionId], (err, results) => {
        if (err) {
            console.error('Error fetching transaction details:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
