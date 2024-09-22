const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const upload = multer();

app.use(bodyParser.json());

const userId = "john_doe_17091999"; // Example user ID

app.post('/bfhl', upload.single('file'), (req, res) => {
    const data = req.body.data || [];
    const file = req.file;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets.filter(c => c === c.toLowerCase()).sort().slice(-1);

    const fileValid = file ? true : false;
    const fileMimeType = file ? file.mimetype : '';
    const fileSizeKb = file ? (file.size / 1024).toFixed(2) : '0';

    res.json({
        is_success: true,
        user_id: userId,
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});