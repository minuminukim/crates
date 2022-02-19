const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const validateSignup = require('../../validations/validateSignup');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review } = require('../../db/models');

const router = express.Router();

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
    const user = await User.getSingleUserByID(id);

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

module.exports = router;
