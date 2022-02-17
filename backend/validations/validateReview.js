const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors');

const validateReview = [
  check('body')
    .isLength({ max: 4000 })
    .withMessage('Review cannot be longer than 4000 characters.'),
  check('listenedDate')
    .exists('Please provide a valid date.')
    .isISO8601({ strict: true })
    .withMessage('Please provide a valid date.'),
    // .isBefore(new Date().toDateString)
    // .withMessage('Please provide a valid date.'),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a rating.')
    .isInt({ min: 1, max: 10 })
    .withMessage('Rating must be between 1 and 10.'),
  check('isRelisten')
    .exists({ checkNull: true })
    .withMessage('Please provide a value for relisten.')
    .isBoolean()
    .withMessage('Please provide a value for relisten.'),
  handleValidationErrors,
];

module.exports = validateReview;
