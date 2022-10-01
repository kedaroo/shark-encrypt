require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { app } = require('./app');

const { PORT } = process.env;

// cloudinary config
const cloudName = process.env.CLOUDINARY_API_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
