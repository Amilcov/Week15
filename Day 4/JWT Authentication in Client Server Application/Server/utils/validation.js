const { validationResult } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) return next();

    const errors = validationErrors
      .array()
      .map( (error) => `${error.msg}`);

    const err = new Error('Bad request');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request';
    next(err);


};

module.exports = {
    handleValidationErrors
}