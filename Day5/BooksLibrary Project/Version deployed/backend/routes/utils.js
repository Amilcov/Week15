const { validationResult } = require('express-validator');


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handlerValidationErrors = (req, _res, next) => {
     const validationErrors = validationResult(req);

     if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(err => err.msg);
        
        const err = new Error('Bad request');
        err.title = 'Bad request:';
        err.status = 400;
        err.errors = errors;

       next(err);

     } else {
       next();
     }

   
};

module.exports = {
                 asyncHandler,
                 handlerValidationErrors
};