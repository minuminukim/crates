const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const qs = require('qs');
const { setAccessTokenCookie } = require('../../spotify-api/spotify-auth');
const {
  searchArtistByName,
  searchAlbumsByTitle,
  getAlbumsByArtistID,
} = require('../../spotify-api/spotify-search');
const { route } = require('.');

const router = express.Router();

// Search for an album by title
// router.get(
//   '/',
//   asyncHandler(async (req, res, next) => {
//     const { spotifyToken } = req.cookies;
//     // const { artistName } = req.body;
//     // await setAccessTokenCookie(res, next)
//     const data = await searchAlbumsByTitle(spotifyToken, 'stereolab');

//     if (data && data.errors) {
//       res.json({ data });
//     } else {
//       res.json({ albums: data });
//     }
//   })
// );

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { spotifyToken } = req.cookies;
    const { query } = req.body;

    const data = await searchAlbumsByTitle(spotifyToken, query);

    if (data && data.errors) {
      res.json({ data });
    } else {
      res.json({ albums: data });
    }
  })
)

module.exports = router;
