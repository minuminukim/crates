const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Album, UserAlbum, Comment, User } = require('../../db/models');
const validateReview = require('../../validations/validateReview');
const generateNewAverageRating = require('../../utils/generateNewAverageRating');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const reviews = await Review.fetchReviews();

    return res.json({
      reviews,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const review = await Review.fetchSingleReviewByID(id);

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

router.get(
  '/:id(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const reviewID = +req.params.id;
    const comments = await Comment.findAll({
      where: { reviewID: reviewID },
      include: { model: User, as: 'user' },
    });

    if (!comments) {
      return next();
    }

    return res.json({
      comments,
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
  requireAuth,
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

    // create album if record doesn't already exist
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

    // then create record in join table
    const userAlbum = await UserAlbum.findOne({
      where: {
        userID: userID,
        albumID: album.id,
      },
    });

    if (!userAlbum) {
      await UserAlbum.create({ userID, albumID: album.id });
    }

    // create a new review..
    const newReview = await Review.create({
      albumID: album.id,
      userID,
      body,
      listenedDate,
      rating,
      isRelisten,
    });

    // update album.averageRating if record already exists in db
    if (!created) {
      const average = await generateNewAverageRating(album.id);
      await album.update({
        ratingsCount: album.ratingsCount + 1,
        averageRating: average,
      });
    }

    // doing another fetch here so i can send payload with associated album
    const review = await Review.fetchSingleReviewByID(newReview.id);

    return res.json({
      review,
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
    const dbReview = await Review.fetchSingleReviewByID(id);

    if (!dbReview) {
      return res
        .status(404)
        .json({ message: 'The requested review could not be found.' });
    }

    const isChanged = dbReview.rating !== review.rating;

    const pairs = Object.entries(review);
    pairs.forEach(([key, value]) => dbReview.set(key, value));
    await dbReview.save();
    const updated = await Review.fetchSingleReviewByID(id);

    // update album ratings
    if (isChanged) {
      const album = await Album.getSingleAlbumByID(updated.albumID);
      const average = await generateNewAverageRating(updated.albumID);
      await album.update({ averageRating: average });
    }

    return res.json({
      updated,
    });
  })
);

router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const review = await Review.fetchSingleReviewByID(id);

    if (!review) {
      return res.status(404).json({ errors: ['Review does not exist'] });
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
