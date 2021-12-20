const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');

router
  .route('/property')
  .get(propertyController.getProperties)
  .post(propertyController.createProperty);

router
  .route('/property/:id')
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
