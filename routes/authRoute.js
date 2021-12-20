const router = require('express').Router();

// const authController = require('../controllers/authController');
const { validateSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);

module.exports = router;
