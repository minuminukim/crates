const axios = require('axios');
const qs = require('qs');
const { spotifyConfig } = require('../config');

const CLIENT_ID = spotifyConfig.clientID;
const CLIENT_SECRET = spotifyConfig.clientSecret;
const ENCODED_PAYLOAD = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64'
);

const getAccessToken = async (next) => {
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
    return token;
  } catch (error) {
    const authenticationError = new Error(
      `An error occurred while communicating with Spotify's Web API.`
    );
    authenticationError.status = 400;
    authenticationError.title = 'Authentication Error';
    authenticationError.errors = {
      spotifyToken: `${authenticationError.message}`,
    };

    return next(authenticationError);
  }
};

const setAccessTokenCookie = async (res, next) => {
  const { access_token, expires_in } = await getAccessToken(next);
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('spotifyToken', access_token, {
    maxAge: expires_in * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax',
  });

  return access_token;
};

const checkAccessToken = (req, res, next) => {
  const { spotifyToken } = req.cookies;
  console.log('spotifyToken', spotifyToken.maxAge);
  next();
};

module.exports = { getAccessToken, setAccessTokenCookie, checkAccessToken };
