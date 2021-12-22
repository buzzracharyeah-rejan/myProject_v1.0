const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = async (payload) => {
  return await jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 });
};
