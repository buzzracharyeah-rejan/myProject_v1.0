const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');

router.route('/property').get(propertyController.getProperties);

router
  .route('/property/:id')
  .get(propertyController.getProperty)
  .post(propertyController.createProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
