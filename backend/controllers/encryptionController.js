const axios = require('axios').default;
const cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');
const sjcl = require('sjcl');
const internalServerError = require('../utils/internalServerError');
const connection = require('../config/database');
const { INSERT_ENCRYPTION } = require('../services/encryptionServices');

const { STABLE_DIFFUSION_VERSION: version, REPLICATE_API_TOKEN: token } = process.env;

exports.encryptMessage = async (req, res) => {
  const {
    sharkName, secretMessage, secretKey, selectedStyle,
  } = req.body;

  if (!sharkName || !secretMessage || !secretKey || !selectedStyle) {
    return res.status(400).json({
      success: false,
      message: 'Send sharkName, secretMessage, secretKey and selectedStyle',
    });
  }

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version,
        input: {
          prompt: `shark ${selectedStyle}`,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    const getPrediction = new Promise((resolve, reject) => {
      setTimeout(async function pollPrediction() {
        const imgUrl = await axios.get(response.data.urls.get, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        switch (imgUrl.data.status) {
          case 'failed':
            reject(new Error('Prediction Failed'));
            break;

          case 'succeeded':
            resolve(imgUrl.data.output[0]);
            break;

          default:
            setTimeout(pollPrediction, 1500);
        }
      }, 2000);
    });

    const url = await getPrediction;

    const result = await cloudinary.v2.uploader.upload(url, {
      folder: 'photos',
    });

    const hashedKey = await bcrypt.hash(String(secretKey), 10);
    const encryptedMessage = sjcl.encrypt(String(secretKey), secretMessage);

    connection.query(
      INSERT_ENCRYPTION,
      [
        sharkName,
        encryptedMessage,
        hashedKey,
        result.public_id,
        result.secure_url,
      ],
      (err) => {
        if (err) {
          console.error(err);
          return internalServerError(res);
        }
        return res.status(200).json({
          success: 'true',
          message: 'Message encrypted successfully',
          imgUrl: result.secure_url,
        });
      },
    );
  } catch (err) {
    console.error(err);
    return internalServerError(res);
  }
  return null;
};
