module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'ThanhNX',
  AUTH: {
    GOOGLE: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
}
