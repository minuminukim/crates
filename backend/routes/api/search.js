const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const qs = require('qs');
const { setAccessTokenCookie } = require('../../spotify-api/spotify-auth');
const {
  searchArtistByName,
  searchAlbumsByArtist,
  getAlbumsByArtistID,
} = require('../../spotify-api/spotify-search');

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
    // await setAccessTokenCookie(res, next)
    const data = await searchAlbumsByArtist(spotifyToken, 'stereolab');

    if (data && data.errors) {
      res.json({ data });
    } else {
      res.json({ albums: data });
    }
  })
);

module.exports = router;
