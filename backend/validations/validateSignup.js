const { handleValidationErrors } = require('./handleValidationErrors');
const { check } = require('express-validator');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email.')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmPassword').custom((value, { req }) => {
    const { password } = req.body;
    if (password && value !== password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateSignup;
