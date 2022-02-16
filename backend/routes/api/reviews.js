const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'hello from reviews' });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = +req.params('id');
  })
);

module.exports = router;
