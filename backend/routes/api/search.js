const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const querystring = require('querystring');
const { spotifyConfig } = require('../../config');

const {
  spotifyConfig: { clientID, clientSecret },
} = require('../../config');

const router = express.Router();

const CLIENT_ID = spotifyConfig.clientID;
const CLIENT_SECRET = spotifyConfig.clientSecret;
const AUTH_TOKEN = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  'utf-8'
).toString('base64');

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' + new Buffer(clientID + ':' + clientSecret).toString('base64'),
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

const getAccessToken = async () => {
  const tokenURL = 'https://accounts.spotify.com/api/token';
  const data = querystring.stringify({ grant_type: 'client_credentials' });
  const headers = {
    Authorization: `Basic ${AUTH_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(tokenURL, data, headers);
    const { access_token } = response.data;
    console.log(access_token);
  } catch (e) {
    console.log(e);
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
