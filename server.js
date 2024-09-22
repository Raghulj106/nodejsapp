

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, 'frontend')));


app.use(bodyParser.json());

// Function to check the validity of Base64 file
function isValidBase64(base64String) {
    try {
        // Check if base64String is valid (you can enhance this)
        return !!base64String;
    } catch (err) {
        return false;
    }
}

// POST endpoint to handle JSON data and file validation
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Extract numbers and alphabets from data array
    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            // Check if the item is a lowercase alphabet
            if (/[a-z]/.test(item)) {
                if (item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    // File handling logic
    const file_valid = isValidBase64(file_b64);
    const file_mime_type = file_valid ? "application/octet-stream" : null; // Assuming generic MIME for now
    const file_size_kb = file_valid ? Buffer.byteLength(file_b64, 'base64') / 1024 : 0;

    // Response format
    const response = {
        is_success: true,
        user_id: "your_name_17091999",  // Replace with dynamic user id
        email: "your.email@example.com", // Replace with actual email
        roll_number: "your_roll_number", // Replace with actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb.toFixed(2)
    };

    res.status(200).json(response);
});

// GET endpoint to return a hardcoded operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
