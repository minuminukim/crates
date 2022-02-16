const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Album } = require('../../db/models');

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

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { spotifyID, title, artistSpotifyID, artworkURL, releaseYear } =
      req.body;
    // TODO.. figure out how the data flows here.. when are records being made in psql...
    // ... should db be pared down without an artists table?
    const [album, created] = await Album.findOrCreate({
      where: { spotifyID: spotifyID },
      defaults: {
        title,
        artworkURL,
        releaseYear,
      },
    });
  })
);

module.exports = router;
