const passport = require('passport');

const httpStatus = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
// const { formatTkn } = require('../utils/formatTkn');
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
    return responseSuccess(res, httpStatus.OK, 'user login', 'user login success', { user, token });
  } catch (error) {
    console.error(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'user login', 'user login falied');
  }
};
