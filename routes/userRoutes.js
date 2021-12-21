const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserSchema } = require('../middlewares/validate');

router
  .route('/api/user/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(validateUserSchema, userController.updateUser);

router.route('/api/user').get(userController.getAllUsers);

module.exports = router;
