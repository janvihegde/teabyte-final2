const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// API to fetch admin data (jobs, internships)
app.get('/api/admin/data', (req, res) => {
    const query = "SELECT * FROM jobs UNION SELECT * FROM internships";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API to submit feedback
app.post('/api/user/feedback', (req, res) => {
    const { userId, feedback } = req.body;
    const query = "INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)";
    db.query(query, [userId, feedback], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, feedbackId: results.insertId });
    });
});

// API to fetch feedback (for admin view)
app.get('/api/admin/feedback', (req, res) => {
    const query = "SELECT * FROM feedback";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));