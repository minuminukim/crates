const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors');

const validateComment = [
  check('body')
    .exists({ checkNull: true })
    .withMessage('Please provide a valid comment.')
    .isLength({ max: 500 })
    .withMessage('Comment cannot be longer than 500 characters.'),
  handleValidationErrors,
];

module.exports = handleValidationErrors;
