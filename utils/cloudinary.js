const cloudinary = require('cloudinary').v2;

const config = cloudinary.config();

export function signUpload() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'avatar',
    },
    config.api_secret
  );
  return {
    timestamp,
    signature,
    cloudName: config.cloud_name,
    apiKey: config.api_key,
  };
}

module.exports = cloudinary;
