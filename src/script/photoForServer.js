
/*Had to use chapgt just to understand how to upload images into specific folders 
because apparently Javascript is built to not have access to the user's file system*/

//This is using NODE js express multer lib
const http = require('http');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const hostname = 'localhost';
const port = 3000;

// Set up storage destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to save images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });
  
  app.listen(3000);
// Serve static files
app.use(express.static('public'));

// Endpoint to upload the image
app.post('/upload', upload.single('photo'), (req, res) => {
    res.send('Image uploaded successfully!');
});




