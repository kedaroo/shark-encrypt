const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const sjcl = require('sjcl');
const fs = require('fs');
const { imgDiff } = require('img-diff-js');
const path = require('path');
const internalServerError = require('../utils/internalServerError');
const connection = require('../config/database');
const { SELECT_ENCRYPTION } = require('../services/decryptionServices');

exports.decryptMessage = async (req, res) => {
  console.log('got hit');
  const { sharkName, secretKey } = req.body;

  if (!sharkName || !secretKey || !req.files) {
    return res.status(400).json({
      success: false,
      message: 'Send sharkName, secretMessage and shark image',
    });
  }

  try {
    connection.query(SELECT_ENCRYPTION, [sharkName], async (err, results) => {
      if (err) {
        console.error(err);
        return internalServerError(res);
      }

      if (!results.length) {
        return res.status(400).json({
          success: false,
          message: 'Invalid inputs',
        });
      }

      const isKeyCorrect = await bcrypt.compare(
        secretKey,
        results[0].secret_key,
      );

      if (!isKeyCorrect) {
        return res.status(400).json({
          success: false,
          message: 'Invalid inputs',
        });
      }

      const url = results[0].img_secure_url;
      //   const writer = fs.createWriteStream(__dirname + '/image1.png');
      const writer = fs.createWriteStream(path.join(__dirname, '/image1.png'));
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });
      response.data.pipe(writer);

      const uploadPath = path.join(__dirname, '/image2.png');
      req.files.File.mv(uploadPath, (error) => {
        if (error) {
          console.log(err);
          return internalServerError(res);
        }
        return null;
      });

      const actualFilename = path.join(__dirname, '/image1.png');
      const expectedFilename = path.join(__dirname, '/image2.png');
      const diffFilename = path.join(__dirname, '/diff.png');

      await new Promise((resolve, reject) => {
        writer.on('finish', () => {
          imgDiff({
            actualFilename,
            expectedFilename,
            diffFilename,
          }).then((result) => {
            fs.unlink(actualFilename, (error) => {
              if (error) console.log(error);
            });
            fs.unlink(expectedFilename, (error) => {
              if (error) console.log(error);
            });
            fs.unlink(diffFilename, (error) => {
              if (error) console.log(error);
            });
            if (!result.imagesAreSame) {
              return res.status(400).json({
                success: 'false',
                message: 'Invalid input',
              });
            }
            const decryptedMessage = sjcl.decrypt(
              secretKey,
              results[0].secret_message,
            );
            return res.status(200).json({
              success: 'true',
              message: 'Message decrypted successfully',
              secretMessage: decryptedMessage,
            });
          });

          resolve();
        });
        writer.on('error', reject);
      });
      return null;
    });
  } catch (err) {
    console.error(err);
    return internalServerError(res);
  }
  return null;
};
