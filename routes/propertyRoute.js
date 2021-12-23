const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const { validatePropertySchema } = require('../middlewares/validate');
// const { isAuthorized } = require('../controllers/authController');
const { isAdmin, isSeller, isBuyer } = require('../controllers/authController');

router
  .route('/api/property')
  .get(isBuyer, propertyController.getProperties)
  .post(isSeller, validatePropertySchema, propertyController.createProperty);

router
  .route('/api/property/:id')
  .get(isBuyer, propertyController.getProperty)
  .patch(isSeller, validatePropertySchema, propertyController.updateProperty)
  .delete(isSeller, propertyController.deleteProperty);

router.get('/api/searchProperty', isBuyer, propertyController.searchProperty);
module.exports = router;
