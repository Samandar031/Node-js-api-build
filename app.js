const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  res.send('<h1>Hello World</h1>');
});
