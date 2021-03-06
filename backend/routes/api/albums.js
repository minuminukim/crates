const express = require('express');
const asyncHandler = require('express-async-handler');
const { Album } = require('../../db/models');
const {
  fetchSingleAlbumWithRetry,
} = require('../../spotify-api/spotify-search');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const albums = await Album.getAlbums();
    return res.json({
      albums,
    });
  })
);

// fetch a single album from database
// router.get(
//   '/:id(\\d+)',
//   asyncHandler(async (req, res, next) => {
//     const albumID = +req.params.id;
//     const album = await Album.getSingleAlbumByID(albumID);

//     if (!album) {
//       const albumError = new Error('Album not found.');
//       albumError.status = 404;
//       albumError.title = 'Album not found.';
//       albumError.errors = {
//         album: `The requested album could not be found.`,
//       };

//       return next(albumError);
//     }

//     return res.json({
//       album,
//     });
//   })
// );

// fetch a single album via spotify api
router.get(
  '/:spotifyID',
  asyncHandler(async (req, res, next) => {
    const { spotifyID } = req.params;
    const album = await fetchSingleAlbumWithRetry(spotifyID);

    if (!album) {
      const albumError = new Error('Album not found.');
      albumError.status = 404;
      albumError.title = 'Album not found.';
      albumError.errors = [`The requested album could not be found.`];

      return next(albumError);
    }

    return res.json({
      album,
    });
  })
);

module.exports = router;
