const router = require('express').Router();
const passport = require('passport');
const httpStatus = require('../constants/generalConstants');

// const authController = require('../controllers/authController');
const { validateUserSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { generateToken } = require('../utils/generateToken');

require('../middlewares/passport_local');

router.post('/api/signup', validateUserSchema, authController.signup);

//! user login using passport-local
router.post('/api/login', passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
