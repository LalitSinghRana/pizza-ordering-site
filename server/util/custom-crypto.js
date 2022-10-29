const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = "3fa8178f95aa34651b93933c48661852";

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  return Buffer.concat([cipher.update(text), cipher.final()]).toString("hex");
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  return Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]).toString();
};

module.exports = {
  encrypt,
  decrypt,
};
