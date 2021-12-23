const router = require('express').Router();
const httpStatus = require('../constants/generalConstants');

// const authController = require('../controllers/authController');
const { validateUserSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { generateToken } = require('../utils/generateToken');
const { isAuthenticated } = require('../controllers/authController');

router.post('/api/signup', validateUserSchema, authController.signup);

//! user login using passport-local
router.post('/api/login', isAuthenticated, authController.setToken);

module.exports = router;
