const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validateComment = require('../../validations/validateComment');

const router = express.Router();

const commentNotFoundError = () => {
  const commentError = new Error('Comment not found.');
  commentError.status = 404;
  commentError.title = 'Comment not found.';
  commentError.errors = [`The requested comment could not be found.`];

  return commentError;
};

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const comments = await Comment.findAll();
    return res.json({
      comments,
    });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return next(commentNotFoundError());
    }

    return res.json({
      comment,
    });
  })
);

router.post(
  '/',
  requireAuth,
  validateComment,
  asyncHandler(async (req, res, next) => {
    const { userID, reviewID, body } = req.body;
    const comment = await Comment.create({
      userID: +userID,
      reviewID: +reviewID,
      body,
    });

    return res.json({
      comment,
    });
  })
);

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateComment,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const oldComment = await Comment.findByPk(id);

    if (!oldComment) {
      return next(commentNotFoundError());
    }

    const { userID, body } = req.body;

    if (oldComment.userID !== userID) {
      const error = new Error({
        title: 'Unauthorized',
        message: 'You are not authorized to edit this comment.',
        status: 401,
      });

      return next(error);
    }

    await oldComment.update({ body: body });
    const comment = await Comment.findByPk(id);

    return res.json({
      comment,
    });
  })
);

router.delete(
  `/:id(\\d+)`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return next(commentNotFoundError());
    }

    const { userID } = req.body;

    if (comment.userID !== userID) {
      const error = new Error({
        title: 'Unauthorized',
        message: 'You are not authorized to edit this comment.',
        status: 401,
      });

      return next(error);
    }

    await comment.destroy();

    return res.status(204).json({});
  })
);

module.exports = router;
