const express = require('express');
const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const { Review, Album } = require('../../db/models');
const validateReview = require('../../validations/validateReview');
const generateNewAverageRating = require('../../utils/generateNewAverageRating');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const reviews = await Review.getReviews();

    return res.json({
      reviews,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const review = await Review.getSingleReviewByID(id);

    if (!review) {
      const reviewError = new Error('Review not found.');
      reviewError.status = 404;
      reviewError.title = 'Review not found.';
      reviewError.errors = {
        review: `The requested review could not be found.`,
      };

      return next(reviewError);
    }

    return res.json({
      review,
    });
  })
);

/**
 * REQUEST:
 * {
 *  review: {
 *    userID: int,
 *    body: str,
 *    listenedDate: date,
 *    rating: int,
 *    isRelisten: boolean,
 *  },
 *   spotifyAlbum: {
 *     spotifyID: str,
 *     title: str,
 *     artist: str,
 *     artworkURL: str,
 *     releaseYear: int,
 *     genres: [],
 *  }
 * }
 */
router.post(
  '/',
  // requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const {
      userID,
      body,
      listenedDate,
      rating,
      isRelisten,
      spotifyID,
      title,
      artworkURL,
      artist,
      releaseYear,
    } = req.body;
    // TODO.. figure out how the data flows here.. when are records being made in psql...
    // ... should db be pared down without an artists table?
    // console.log('@@@@@@@@@@@@@@@@@', review.rating / 2);

    const [album, created] = await Album.findOrCreate({
      where: { spotifyID: spotifyID },
      defaults: {
        spotifyID: spotifyID,
        title: title,
        averageRating: rating,
        ratingsCount: 1,
        artworkURL: artworkURL,
        artist: artist,
        releaseYear: releaseYear,
      },
    });

    const newReview = await Review.create({
      albumID: album.id,
      userID,
      body,
      listenedDate,
      rating,
      isRelisten,
    });

    if (!created) {
      const average = await generateNewAverageRating(album.id);
      await album.update({
        ratingsCount: album.ratingsCount + 1,
        averageRating: average,
      });
    }

    return res.json({
      review: newReview,
    });
  })
);

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const review = req.body;
    const id = +req.params.id;
    const dbReview = await Review.getSingleReviewByID(id);

    console.log('req.body', req.body);

    if (!dbReview) {
      return res
        .status(404)
        .json({ message: 'The requested review could not be found.' });
    }

    const isChanged = dbReview.rating !== review.rating;

    const pairs = Object.entries(review);
    pairs.forEach(([key, value]) => dbReview.set(key, value));
    await dbReview.save();
    const updated = await Review.getSingleReviewByID(id);

    // update album ratings
    if (isChanged) {
      const album = await Album.getSingleAlbumByID(updated.albumID);
      const average = await generateNewAverageRating(updated.albumID);
      await album.update({ averageRating: average });
    }

    return res.json({
      review: updated,
    });
  })
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const review = await Review.getSingleReviewByID(id);

    if (!review) {
      return res.status(404).json({ message: 'Review does not exist' });
    }

    const { albumID } = review;
    await review.destroy();
    const album = await Album.getSingleAlbumByID(albumID);
    const average = await generateNewAverageRating(albumID);
    await album.update({
      ratingsCount: album.ratingsCount - 1,
      averageRating: average,
    });

    return res.status(204).json({});
  })
);

module.exports = router;
