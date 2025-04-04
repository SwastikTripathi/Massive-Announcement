const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/save-response', (req, res) => {
  const text = req.body.text;
  const filePath = path.join(__dirname, 'response.txt');
  fs.appendFile(filePath, text + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving response');
    } else {
      res.send('Response saved');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});