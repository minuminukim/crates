const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors');

const validateList = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a list name.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name cannot be longer than 100 characters.'),
  check('description')
    .isLength({ max: 4000 })
    .withMessage('Description cannot be longer than 4000 characters.'),
  handleValidationErrors,
];

module.exports = validateList;
