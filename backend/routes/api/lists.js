const express = require('express');
const asyncHandler = require('express-async-handler');
const { List, Album, AlbumList } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const lists = await List.getLists(); // with albums
    return res.json({
      lists,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const list = await List.getSingleListByID(id); // with albums

    if (!list) {
      const listError = new Error('List not found.');
      listError.status = 404;
      listError.title = 'List not found.';
      listError.errors = {
        review: `The requested list could not be found.`,
      };

      return next(listError);
    }

    return res.json({
      list,
    });
  })
);

// {
//   userID,
//   title: 'some title',
//   description: 'some description' || null,
//   isRanked: true || false,
//   albums: []
// }

router.post(
  '/',
  // TODO: form validation
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userID, title, description, isRanked, albums: items } = req.body;

    // iterate over albums, findOrCreate each
    const albums = await items.reduce(async (promise, item) => {
      // await the previous callback
      const acc = await promise;
      const { spotifyID } = item;
      const [album] = await Album.findOrCreate({
        where: { spotifyID: spotifyID },
        defaults: {
          spotifyID: spotifyID,
          title: item.title,
          averageRating: 0.0,
          ratingsCount: 0,
          artworkURL: item.artworkURL,
          artist: item.artist,
          releaseYear: item.releaseYear,
        },
        raw: true,
      });

      return [...acc, album];
    }, Promise.resolve([]));

    const newList = await List.create({
      userID,
      title,
      description,
      isRanked,
    });

    // iterate over albums and create join table records
    await Promise.all(
      albums.map(async (album, i) => {
        await AlbumList.create({
          albumID: album.id,
          listID: newList.id,
          listIndex: isRanked ? i : null,
        });
      })
    );

    // fetch list with associated albums
    const list = await List.getSingleListByID(newList.id);

    return res.json({
      list,
    });
  })
);

module.exports = router;
