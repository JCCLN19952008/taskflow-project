if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (!process.env.PORT) {
  process.env.PORT = 3000;
}

if (!process.env.MONGODB_URI) {
  throw new Error('La URI de MongoDB no está definida');
}

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI
};