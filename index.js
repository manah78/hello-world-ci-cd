const express = require('express'); // Import Express
const app = express(); // Create an Express app
const port = 3000; // Define the port
const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for an in-memory database

// Create a table and insert sample data
db.serialize(() => {
    db.run('CREATE TABLE contacts (name TEXT, email TEXT)');
    db.run('INSERT INTO contacts (name, email) VALUES ("John Doe", "john@example.com")');
    db.run('INSERT INTO contacts (name, email) VALUES ("Jane Smith", "jane@example.com")');
});

// Route to fetch data from the database
app.get('/contacts', (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving contacts');
        } else {
            res.json(rows);
        }
    });
});


// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Welcome to My App</h1>
                <p>This is the home page.</p>
                <a href="/about">About</a> | <a href="/contact">Contact</a>
            </body>
        </html>
    `);
});

// About route
app.get('/about', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>About Us</h1>
                <p>This page provides information about our app.</p>
                <a href="/">Home</a> | <a href="/contact">Contact</a>
            </body>
        </html>
    `);
});

// Contact route
app.get('/contact', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Contact Us</h1>
                <p>Get in touch with us here.</p>
                <a href="/">Home</a> | <a href="/about">About</a>
            </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
