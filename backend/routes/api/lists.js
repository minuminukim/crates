const express = require('express');
const asyncHandler = require('express-async-handler');
const { List, Album, AlbumList, User } = require('../../db/models');
const reduceListAlbums = require('../../utils/reduceListAlbums');
const { requireAuth } = require('../../utils/auth');
const validateList = require('../../validations/validateList');
const useAlbumFindOrCreate = require('../../utils/useAlbumFindOrCreate');

const router = express.Router();

const listNotFoundError = () => {
  const listError = new Error('List not found.');
  listError.status = 404;
  listError.title = 'List not found.';
  listError.errors = {
    list: `The requested list could not be found.`,
  };

  return listError;
};

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const lists = await List.findAll({
      include: [
        {
          model: Album,
          as: 'albums',
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // iterate over lists and sort each if they're ranked
    for (const list of lists) {
      if (list.isRanked) {
        list.albums.sort((a, b) => {
          return a.AlbumList.listIndex - b.AlbumList.listIndex;
        });
      }
    }

    return res.json({
      lists,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const list = await List.findOne({
      where: { id: id },
      include: [
        {
          model: Album,
          as: 'albums',
        },
      ],
    });

    if (!list) {
      return next(listNotFoundError());
    }

    if (list.isRanked) {
      list.albums.sort((a, b) => a.AlbumList.listIndex - b.AlbumList.listIndex);
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
  requireAuth,
  validateList,
  asyncHandler(async (req, res, next) => {
    const { userID, title, description, isRanked, albums: items } = req.body;

    // iterate over the incoming albums and findOrCreate a record for each
    const albums = await reduceListAlbums(items);

    // ...then create a new list
    const newList = await List.create({
      userID,
      title,
      description,
      isRanked,
    });

    // ...and create join table records
    await Promise.all(
      albums.map(async (album, i) => {
        await AlbumList.create({
          albumID: album.id,
          listID: newList.id,
          listIndex: isRanked ? i : null,
        });
      })
    );

    // ...finally fetch the list with its associated albums
    const list = await List.getSingleListByID(newList.id);

    //... sort the list in place if ranked
    if (list.isRanked) {
      list.albums.sort((a, b) => a.AlbumList.listIndex - b.AlbumList.listIndex);
    }

    return res.json({
      list,
    });
  })
);

// handles updates dispatched from the form
router.put(
  '/:id(\\d+)',
  requireAuth,
  validateList,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const oldList = await List.findByPk(id);

    if (!oldList) {
      return next(listNotFoundError());
    }

    /** TODO: figure out a less naive approach
     * on how to trigger a cascading update on AlbumLists
     * in instances where the list is ordered and the order changes...
     * already tracking indexes on each record..
     * do we add a `next` column and treat it as a linked list?
     * but for now ...
     */

    // ...destroy all join table entries before list update
    await AlbumList.destroy({
      where: {
        listID: oldList.id,
      },
    });

    // ...then iterate over albums and findOrCreate each
    const albums = await reduceListAlbums(req.body.albums);

    // ...then (re)create join table records with updated indices
    const { isRanked } = req.body;
    await Promise.all(
      albums.map(async (album, i) => {
        await AlbumList.create({
          albumID: album.id,
          listID: oldList.id,
          listIndex: isRanked ? i : null,
        });
      })
    );

    // construct an entries array from payload without albums
    // then update and save the list
    Object.entries(req.body)
      .filter(([k, _v]) => k !== 'albums')
      .forEach(([k, v]) => oldList.set(k, v));
    await oldList.save();

    // ...then fetch the updated list with its associated albums
    const list = await List.getSingleListByID(id);

    // albums arent returned in order, so we sort in place
    if (list.isRanked) {
      list.albums.sort((a, b) => a.AlbumList.listIndex - b.AlbumList.listIndex);
    }

    return res.json({
      list,
    });
  })
);

// Appends a single item to a list -- receives requests dispatched
// from action panels
router.patch(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const { spotifyID, title, artworkURL, artist, releaseYear } = req.body;

    const { album } = await useAlbumFindOrCreate({
      spotifyID,
      title,
      artworkURL,
      artist,
      releaseYear,
    });

    const [albumList, created] = await AlbumList.findOrCreate({
      where: { albumID: album.id, listID: id },
      defaults: {
        albumID: album.id,
        listID: id,
      },
    });

    if (!created) {
      return res.status(400).json({
        errors: [`An album cannot be added more than once to a list.`],
      });
    }

    const list = await List.getSingleListByID(id);

    // albums arent returned in order, so we sort in place
    if (list.isRanked) {
      list.albums.sort((a, b) => a.AlbumList.listIndex - b.AlbumList.listIndex);
    }

    return res.json({
      list,
    });
  })
);

router.delete(
  `/:id(\\d+)`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const list = await List.findByPk(id);

    if (!list) {
      return next(listNotFoundError());
    }

    if (list.userID !== req.user.id) {
      const error = new Error('You are not authorized to delete this list.');
      error.status = 401;
      error.title = 'Unauthorized';
      error.errors = ['You are not authorized to delete this list'];

      return next(error);
    }
    // destroy the join table records first because of FK constraint
    await AlbumList.destroy({
      where: {
        listID: id,
      },
    });
    await list.destroy();

    return res.status(204).json({});
  })
);

module.exports = router;
