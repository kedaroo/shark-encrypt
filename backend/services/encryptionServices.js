exports.INSERT_ENCRYPTION = `INSERT INTO encryption_log 
    (shark_name, secret_message, secret_key, img_public_id, img_secure_url) VALUES 
    (?, ?, ?, ?, ?);`;
