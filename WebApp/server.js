const https = require('https'); //!
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

// Load your certificate and key //!
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Security middleware
// app.use(helmet()); // Turn off in Dev mode

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});
// app.use(limiter); 

app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit if needed

// Sanitize input function
function sanitizeInput(input) {
    return input.replace(/[^a-z0-9_\-]/gi, '');
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `index.html`));
});

// Handle POST requests to the /upload route
app.post('/upload', (req, res) => {
    const username = sanitizeInput(req.query.username); // Sanitize the username
    const base64Data = req.body.image.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(__dirname, 'imagesTest', `${username}.png`); // Save the image as a PNG file

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving the image');
        } else {
            res.send('Image saved successfully');
        }
    });
});

//! For HTTP
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

//! For HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});