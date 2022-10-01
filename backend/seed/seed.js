const {
    dropEncryptionLogTableSQL,
    createEncryptionLogTableSQL,
  } = require("./sql");
  
  const mysql = require("mysql2/promise");
  require("dotenv").config();
  
  const { DATABASE_URL } = process.env;
  
  const seedSchema = async () => {
    const connection = await mysql.createConnection(DATABASE_URL);
    console.log("Connection to db successful!");
  
    try {
      await connection.query(dropEncryptionLogTableSQL);
      console.log("***dropped encryption_log table***");
  
      await connection.query(createEncryptionLogTableSQL);
      console.log("***created encryption_log table***");
    } catch (err) {
      console.log(err);
    }
  };
  
  seedSchema()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  