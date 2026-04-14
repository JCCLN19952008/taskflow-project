require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido');
}

if (!process.env.MONGODB_URI) {
  throw new Error('La URI de MongoDB no está definida');
}

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI
};