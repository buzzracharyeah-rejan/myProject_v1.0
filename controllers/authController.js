const passport = require('passport');

const httpStatus = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
// const { formatTkn } = require('../utils/formatTkn');c
const roles = require('../constants/roles');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return responseSuccess(res, httpStatus.CREATED, 'signup', 'user signup success', user);
  } catch (error) {
    // console.log(error.message);
    return responseError(res, httpStatus.BAD_REQUEST, 'error', 'user signup failed');
  }
};

exports.setToken = async (req, res, next) => {
  try {
    const { user, token } = await req.user.generateToken();

    if (!user) throw new Error();

    res.setHeader('authorization', token);
    responseSuccess(res, httpStatus.OK, 'user login', 'user login success', { user, token });
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.BAD_REQUEST, 'user login', 'user login falied');
  }
};

exports.isAuthenticated = async (req, res, next) => {
  await passport.authenticate('local', { session: false }, (err, user, info) => {
    if (info && info.title) {
      const { title, message } = info;
      return responseError(res, httpStatus.UNAUTHORIZED, title, message);
    }

    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isAuthorized = async (req, res, next) => {
  // console.log('is Authorized');
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log({ err, user, info });
    if (err) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', err.message);
    }
    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isAdmin = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log({ err, user, info });
    if (err) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', err.message);
    }
    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    if (user.userType !== roles.ADMIN) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized user access');
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isSeller = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }

    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    if (user.userType !== roles.SELLER) {
      if (user.userType === roles.ADMIN) next();

      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized user access');
    }

    next();
  })(req, res, next);
};

exports.isBuyer = async (req, res, next) => {
  // console.log('is buyer');
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }

    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    // console.log(user.userType !== roles.BUYER);

    //buyer seller admin

    if (user.userType !== roles.BUYER) {
      if (user.userType === roles.SELLER || user.userType === roles.ADMIN) {
        return next();
      }
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized access');
    }

    req.user = user;
    next();
  })(req, res, next);
};
