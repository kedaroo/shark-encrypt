require('dotenv').config();
const cloudinary = require('cloudinary');
const { app } = require('./app');

const { PORT } = process.env;

// cloudinary config
const cloudName = process.env.CLOUDINARY_API_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({ cloudName, apiKey, apiSecret });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
