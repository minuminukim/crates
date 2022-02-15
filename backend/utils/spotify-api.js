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

  return token;
};

class SearchError extends Error {
  constructor(message, status, title, errors) {
    super(message);
    this.name = 'SearchError';
    this.status = status;
    this.title = title;
    this.errors = errors;
  }
}

// TODO: error handling for: 1) expired token(401), 2) rate limit (403)

// SEARCH HELPERS
const searchArtistByName = async (accessToken, artistName) => {
  // const apiURL = `https://api.spotify.com/v1/search?q=name:${artistName}&type=artist&include_external=audio`;
  const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error@@@@@@@@@@', JSON.stringify(error));
    return new SearchError(
      `No results found for ${artistName}.`,
      400,
      'Search Error',
      { search: `${this.message}` }
    );
  }
};

module.exports = { getAccessToken, setAccessTokenCookie, searchArtistByName };
