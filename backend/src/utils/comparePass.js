const bcrypt = require("bcryptjs");
// comparing user password for login
const comPass = (password, hashed_password) => {
  return bcrypt.compare(password, hashed_password);
};
module.exports = comPass;
