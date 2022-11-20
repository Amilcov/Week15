const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');


const { asyncHandler, handlerValidationErrors } = require('./utils');
const { requireAuth } = require('../auth');


const router = express.Router();
router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const authors = await db.Author.findAll({
    order: [["firstName", "ASC"], ["lastName", "ASC"],]
  }) ;
  res.json({authors});
}));


/*

const stockValidators = [
  check('symbol')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for symbol')
    .isLength({ min: 1, max: 4})
    .withMessage('Symbol must have 1 or 4 characters'),

  check('name')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for name'),

  check('yearListed')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for Year Listed')
    .isInt({min: 1970, max: 2050})
    .withMessage('Please provide a year between 1970 and 2050 for Year Listed'),
    
  check('marketShares')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for Market Shares'),
   
  check('marketValue')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for Market Capitalization'),

]


router.post('/', stockValidators, handlerValidationErrors, asyncHandler(async (req, res) => {

  if (req.errors) {
     return res.status(404).json({"errors": req.errors});
  } else {
     const {symbol, name, yearListed, marketShares, marketValue, info} = req.body;
     const stock = await db.Stock.create({symbol, name, yearListed, marketShares, marketValue, info});

     return res.status(201).json({stock});
  }


}));

router.post('/edit/:stockId(\\d+)', 
stockValidators, handlerValidationErrors, asyncHandler(async (req, res) => {
 
   const stockId = parseInt(req.params.stockId, 10);

    if (req.errors) {
      return res.status(404).json({"errors": req.errors});
    } else {
      const {symbol, name, yearListed, marketShares, marketValue, info} = req.body;
      const stock = {symbol, name, yearListed, marketShares, marketValue, info};
     
      const stockToUpdate= await db.Stock.findByPk(stockId);
      await stockToUpdate.update(stock);
      
      return res.status(200).json({stock});
  }

}));

router.get('/:stockId(\\d+)', asyncHandler(async (req, res) => {
  const stockId = parseInt(req.params.stockId, 10);
  const stock = await db.Stock.findByPk(stockId);

  return res.status(200).json({stock});
}));


router.delete('/delete/:stockId(\\d+)', 
asyncHandler(async (req, res, next) => {

const stockId = parseInt(req.params.stockId, 10);
const stock = await db.Stock.findByPk(stockId);


  if (stock) {
      await stock.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t a stock with id ${id} in the database`);
       err.title = 'Stock not found';
       err.status = 404;
       return next(err);
  }

}));

*/
module.exports = router;