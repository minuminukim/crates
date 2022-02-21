const express = require('express');
const asyncHandler = require('express-async-handler');
const { SearchError } = require('../../spotify-api/spotify-errors');
const { searchAlbumsWithRetry } = require('../../spotify-api/spotify-search');

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { query } = req.body;
    const data = await searchAlbumsWithRetry(query);

    if (data && data instanceof SearchError) {
      return next(data);
    }

    return res.json({
      albums: data,
    });
  })
);

module.exports = router;
