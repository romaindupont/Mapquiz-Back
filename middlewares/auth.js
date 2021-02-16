const jwt = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

const authorizationConnection = jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] });

module.exports = {
  authorizationConnection,
}