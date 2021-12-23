const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validateUserSchema } = require('../middlewares/validate');
const { isAuthorized, isAdmin, isBuyer } = require('../controllers/authController');
// const { isAdmin, isOwner, isBuyer } = require('../controllers/authController');

router.route('/api/user/:id').get(isBuyer, userController.getUser);

router
  .route('/api/user')
  .get(isAdmin, userController.getAllUsers)
  .delete(isBuyer, userController.deleteUser)
  .patch(isBuyer, validateUserSchema, userController.updateUser);

router.get('/api/user/profile', isBuyer, userController.getUser);

module.exports = router;
