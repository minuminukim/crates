const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const qs = require('qs');
const { setAccessTokenCookie } = require('../../utils/spotify-api');
const { spotifyConfig } = require('../../config');

const router = express.Router();

const CLIENT_ID = spotifyConfig.clientID;
const CLIENT_SECRET = spotifyConfig.clientSecret;
const ENCODED_PAYLOAD = new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64'
);

const getAccessToken = async () => {
  const tokenURL = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${ENCODED_PAYLOAD}`,
    },
  };

  try {
    const response = await axios.post(tokenURL, data, headers);
    const token = response.data;
    const { access_token } = response.data;
    console.log('success');
    console.log('data', response.data);
    console.log(access_token);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({ message: 'howdy' });
    getAccessToken();
  })
);

module.exports = router;
