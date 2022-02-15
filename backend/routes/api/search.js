const express = require('express');
const asyncHandler = require('express-async-handler');
const { searchArtistByName } = require('../../utils/spotify-api');
const axios = require('axios');
const qs = require('qs');

const router = express.Router();

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     res.json({ message: 'howdy' });
//     getAccessToken();
//   })
// );

// search artist
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const { spotifyToken } = req.cookies;
    const { artistName } = req.body;
    const data = await searchArtistByName(spotifyToken, 'kanye west');

    if (data && data.errors) {
      res.json({ data });
    } else {
      console.log('data', data);
      const artists = data.artists
      // console.log('artists.items', data.artists.items);
      res.json({ artists });
    }
  })
);

module.exports = router;
