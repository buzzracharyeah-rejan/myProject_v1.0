const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const { validatePropertySchema } = require('../middlewares/validate');
router
  .route('/property')
  // get properties
  .get(propertyController.getProperties)
  // create properties
  .post(validatePropertySchema, propertyController.createProperty);

router
  .route('/property/:id')
  // get property by id
  .get(propertyController.getProperty)
  // update property
  .patch(validatePropertySchema, propertyController.updateProperty)
  // delete property
  .delete(propertyController.deleteProperty);

module.exports = router;
