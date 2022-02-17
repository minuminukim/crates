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
        reviewID: `The requested review could not be found.`,
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
    const { review, spotifyAlbum } = req.body;
    console.log('req.body@@@@@@@', req.body);
    // TODO.. figure out how the data flows here.. when are records being made in psql...
    // ... should db be pared down without an artists table?
    // console.log('@@@@@@@@@@@@@@@@@', review.rating / 2);

    const [album, created] = await Album.findOrCreate({
      where: { spotifyID: spotifyAlbum.spotifyID },
      defaults: {
        spotifyID: spotifyAlbum.spotifyID,
        title: spotifyAlbum.title,
        averageRating: review.rating,
        ratingsCount: 1,
        artworkURL: spotifyAlbum.artworkURL,
        artist: spotifyAlbum.artist,
        releaseYear: spotifyAlbum.releaseYear,
      },
    });

    const newReview = await Review.create({ ...review, albumID: album.id });

    if (!created) {
      album.set('ratingsCount', album.ratingsCount + 1);
      const newAverage = await generateNewAverageRating(album.id);
      console.log('newAverage', newAverage);
      album.set('averageRating', newAverage);
      await album.save();
    }

    return res.json({
      review: newReview,
    });
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    console.log('req.body', req.body);
    const { review } = req.body;
    const id = +req.params.id;
    const dbReview = await Review.getSingleReviewByID(id);

    if (!dbReview) {
      return res
        .status(404)
        .json({ message: 'The requested review could not be found.' });
    }

    const pairs = Object.entries(review);
    pairs.forEach(([key, value]) => dbReview.set(key, value));
    await dbReview.save();
    const updated = await Review.getSingleReviewByID(id);

    // update album ratings
    const album = await Album.getSingleAlbumByID(updated.albumID);
    album.updateAverageRating(review.rating / 2);
    await album.save();

    return res.json({
      review: updated,
    });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    return null;
  })
);

module.exports = router;
