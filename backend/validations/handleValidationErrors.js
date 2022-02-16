const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const result = validationErrors.mapped();
    const errors = Object.keys(result).reduce((acc, field) => {
      acc[field] = result[field].msg;
      return acc;
    }, {});

    const error = Error('Bad request.');
    error.errors = errors;
    error.status = 400;
    error.title = 'Bad request.';
    next(error);
  }

  next();
};

module.exports = {
  handleValidationErrors,
};
