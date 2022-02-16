const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Album } = require('../../db/models');
const validateReview = require('../../validations/validateReview');
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
    const [album, created] = await Album.findOrCreate({
      where: { spotifyID: spotifyAlbum.spotifyID },
      defaults: {
        spotifyID: spotifyAlbum.spotifyID,
        title: spotifyAlbum.title,
        averageRating: review.rating / 2,
        artworkURL: spotifyAlbum.artworkURL,
        artist: spotifyAlbum.artist,
        releaseYear: spotifyAlbum.releaseYear,
      },
    });

    const albumID = album.id;
    const newReview = await Review.create({ ...review, albumID });

    // if (!created) {
    //   Album.c
    // }
    // TODO: update album count & averageRating if no new album was created

    return res.json({
      review: newReview,
    });
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
