const db = require('./dbConnect');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;

module.exports = { db, crypto, jwt, jwt_secret_key };