const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Album } = require('../../db/models');
const validateReview = require('../../validations/validateReview');

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
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = +req.params('id');
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
 *   album: {
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
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const { review, album } = req.body;
    // TODO.. figure out how the data flows here.. when are records being made in psql...
    // ... should db be pared down without an artists table?
    const [album, created] = await Album.findOrCreate({
      where: { spotifyID: req.body.spotifyID },
      defaults: {
        spotifyID: req.body.spotifyID,
        title: req.body.title,
        averageRating: req.body.rating,
        artworkURL: req.body.artworkURL,
        artist: req.body.artist,
        releaseYear: req.body.releaseYear,
        artworkURL: req.body.artworkURL,
      },
    });

    const albumID = created ? created.id : album.id;
    const newReview = await Review.create({ ...review, albumID });
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res, next) => {
    return null;
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    return null;
  })
);

module.exports = router;
