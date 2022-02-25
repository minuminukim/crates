const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors');

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Comment cannot be empty.')
    .isLength({ max: 500 })
    .withMessage('Comment cannot be longer than 500 characters.'),
  handleValidationErrors,
];

module.exports = validateComment;
