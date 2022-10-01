const express = require('express');

const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const encryptMessage = require('./routes/encryptMessage');
const decryptMessage = require('./routes/decryptMessage');

app.use('/api/v1/', encryptMessage);
app.use('/api/v1/', decryptMessage);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello world!' });
});

exports.app = app;
