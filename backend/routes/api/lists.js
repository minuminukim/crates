const express = require('express');
const asyncHandler = require('express-async-handler');
const { List, Album, AlbumList } = require('../../db/models');
const reduceListAlbums = require('../../utils/reduceListAlbums');
const { requireAuth } = require('../../utils/auth');
const validateList = require('../../validations/validateList');

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
    console.log('list', JSON.stringify(list));

    if (!list) {
      return next(listNotFoundError());
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

    return res.json({
      list,
    });
  })
);

// Appends a single item to a list
router.patch(
  '/:id(\\d+)',
  // TODO: validation errors,
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    // TODO: build this for smaller edits like appending a single item
  })
);

// handles
router.put(
  '/:id(\\d+)',
  // TODO: validation errors,
  // requireAuth,
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
    await Promise.all(
      albums.map(async (album, i) => {
        await AlbumList.create({
          albumID: album.id,
          listID: oldList.id,
          listIndex: oldList.isRanked ? i : null,
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

    return res.json({
      list,
    });
  })
);

router.delete(
  `/:id(\\d+)`,
  // requireAuth,
  // TODO: validation,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const list = await List.findByPk(id);

    if (!list) {
      return next(listNotFoundError());
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
