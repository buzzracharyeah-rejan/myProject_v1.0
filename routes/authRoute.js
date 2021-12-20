const router = require('express').Router();

// const authController = require('../controllers/authController');
const { validateSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');

router.post('/signup', validateSchema, authController.signup);

module.exports = router;
