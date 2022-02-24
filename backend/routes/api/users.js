const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const validateSignup = require('../../validations/validateSignup');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {
  User,
  Review,
  List,
  Album,
  Backlog,
  AlbumBacklog,
  UserAlbum,
} = require('../../db/models');
const useAlbumFindOrCreate = require('../../utils/useAlbumFindOrCreate');

const router = express.Router();

const userNotFoundError = () => {
  const userError = new Error('User not found.');
  userError.status = 404;
  userError.title = 'User not found.';
  userError.errors = {
    userID: `The requested user could not be found.`,
  };

  return userError;
};

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const user = await User.findOne({
      where: { id: id },
      include: [
        { model: Album, as: 'albums', attributes: ['id', 'spotifyID'] },
        {
          model: Review,
          as: 'reviews',
          attributes: ['id', 'rating', 'albumID'],
        },
      ],
      order: [[{ model: Review, as: 'reviews' }, 'id', 'DESC']],
    });

    if (!user) {
      const userError = new Error('User not found.');
      userError.status = 404;
      userError.title = 'User not found.';
      userError.errors = {
        userID: `The requested user could not be found.`,
      };

      return next(userError);
    }

    return res.json({
      user,
    });
  })
);

router.get(
  `/:id(\\d+)/reviews`,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const reviews = await Review.getUserReviews(id);
    return res.json({
      reviews,
    });
  })
);

router.get(
  `/:id(\\d+)/lists`,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const lists = await List.findAll({
      where: {
        userID: id,
      },
      include: [
        {
          model: Album,
          as: 'albums',
        },
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    return res.json({
      lists,
    });
  })
);

// return a user's backlog
router.get(
  `/:id(\\d+)/backlog`,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const user = await User.getSingleUserByID(id);

    // check if the user exists first
    if (!user) {
      return next(userNotFoundError());
    }

    // find or create backlog because model isn't set up to
    // automatically create a backlog on user creation
    const [backlog, _created] = await Backlog.findOrCreate({
      where: { userID: id },
      defaults: {
        userID: id,
      },
    });

    const items = await AlbumBacklog.findAll({
      where: { backlogID: backlog.id },
      include: { model: Album },
    });

    const albums = items.map((item) => item.Album);

    return res.json({
      backlog: albums,
    });
  })
);

// appends an album to a user's backlog
router.put(
  `/:id(\\d+)/backlog`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    console.log('req@@@@@@@@@@@@@@@', req.body);
    const { spotifyID, title, artworkURL, artist, releaseYear } = req.body;

    // get the user's backlog
    const [backlog, _created] = await Backlog.findOrCreate({
      where: { userID: id },
      defaults: {
        userID: id,
      },
    });

    const { album } = await useAlbumFindOrCreate({
      spotifyID,
      title,
      artworkURL,
      artist,
      releaseYear,
    });

    // create the join table record
    const [albumBacklog, created] = await AlbumBacklog.findOrCreate({
      where: {
        albumID: album.id,
        backlogID: backlog.id,
      },
    });

    if (!created) {
      return res.status(400).json({
        errors: [`An album cannot be added more than once to a backlog.`],
      });
    }

    const items = await AlbumBacklog.findAll({
      where: { backlogID: backlog.id },
      include: { model: Album },
    });

    const albums = items.map((item) => item.Album);

    return res.json({
      backlog: albums,
    });
  })
);

router.delete(
  `/:id(\\d+)/backlog/:albumID`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const albumID = +req.params.albumID;

    const backlog = await Backlog.findOne({
      where: {
        userID: id,
      },
    });

    const albumBacklog = await AlbumBacklog.findOne({
      where: {
        backlogID: backlog.id,
        albumID: albumID,
      },
    });

    if (!albumBacklog) {
      return res
        .status(404)
        .json({ errors: ['The requested resource could not be found.'] });
    }

    await albumBacklog.destroy();

    return res.status(204).json({});
  })
);

router.get(
  `/:id(\\d+)/albums`,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    // const albums = await UserAlbum.findAll(
    //   { where: { userID: id } },
    //   { include: { model: Album, as: 'albums' } }
    // );
    const { albums } = await User.findOne({
      where: { id: id },
      include: { model: Album, as: 'albums' },
    });

    console.log('albums', albums);

    if (!albums) {
      return res.status(404).json({
        errors: ['The requested resource could not be found.'],
      });
    }

    // const mapped = albums.map((album) => { })
    return res.json({
      albums,
    });
  })
);

router.post(
  `/:id(\\d+)/albums`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;

    const { spotifyID, title, artworkURL, artist, releaseYear } = req.body;
    console.log('req.body', req.body);

    const { album } = await useAlbumFindOrCreate({
      spotifyID,
      title,
      artworkURL,
      artist,
      releaseYear,
    });

    const [userAlbum, created] = await UserAlbum.findOrCreate({
      where: { userID: id, albumID: album.id },
      defaults: {
        userID: id,
        albumID: album.id,
      },
    });

    if (userAlbum && !created) {
      return res.status(400).json({
        errors: [`Album already exists in the user's records.`],
      });
    }

    // Check if the album exists in the user's backlog...
    // and remove it if it does
    const backlog = await Backlog.findOne({
      where: { userID: id },
      include: {
        model: Album,
        as: 'albums',
      },
    });

    const albumBacklog = await AlbumBacklog.findOne({
      where: { albumID: album.id, backlogID: backlog.id },
    });
    if (albumBacklog) {
      await albumBacklog.destroy();
    }
    // const inBacklog = backlog.albums.find((item) => item.id === album.id);

    // if (inBacklog) {
    //   await inBacklog.destroy();
    // }

    return res.json({
      userAlbum,
      album,
    });
  })
);

router.delete(
  `/:id(\\d+)/albums/:albumID`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const albumID = +req.params.albumID;

    const userAlbum = await UserAlbum.findOne({
      where: {
        userID: id,
        albumID: albumID,
      },
    });

    if (!userAlbum) {
      return res.status(404).json({
        errors: ['The requested resource could not be found.'],
      });
    }

    await userAlbum.destroy();

    return res.status(204).json({});
  })
);

module.exports = router;
