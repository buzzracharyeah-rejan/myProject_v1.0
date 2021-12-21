const router = require('express').Router();

// const authController = require('../controllers/authController');
const { validateUserSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');

router.post('/api/signup', validateUserSchema, authController.signup);

module.exports = router;
