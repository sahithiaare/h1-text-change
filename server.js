// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load h1 text from data.json
let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
let h1Text = data.h1Text || "Default Mobile Development Title";

// Route to serve the "Mobile Development" page
app.get('/mobile-development', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mobile Development</title>
        </head>
        <body>
            <h1>${h1Text}</h1>
        </body>
        </html>
    `);
});

// Route to serve the admin panel
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

// API endpoint to get the current h1 text
app.get('/api/h1-text', (req, res) => {
    res.json({ h1Text });
});

// API endpoint to update the h1 text
app.post('/api/h1-text', (req, res) => {
    h1Text = req.body.h1Text;
    data.h1Text = h1Text;
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json({ h1Text });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
