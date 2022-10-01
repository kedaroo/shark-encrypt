exports.dropEncryptionLogTableSQL = "DROP TABLE IF EXISTS encryption_log;";

exports.createEncryptionLogTableSQL = `CREATE TABLE encryption_log (
    id int PRIMARY KEY AUTO_INCREMENT,
    shark_name VARCHAR(255) NOT NULL UNIQUE,
    secret_message TEXT NOT NULL,
    secret_key TEXT NOT NULL,
    img_public_id TEXT NOT NULL,
    img_secure_url TEXT NOT NULL
  );`;
