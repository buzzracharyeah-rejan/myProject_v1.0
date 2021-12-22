const httpStatus = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { formatTkn } = require('../utils/formatTkn');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return responseSuccess(res, httpStatus.CREATED, 'signup', 'user signup success', user);
  } catch (error) {
    console.log(error.message);
    return responseError(res, httpStatus.BAD_REQUEST, 'error', 'user signup failed');
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, token } = await req.user.generateToken();

    if (!user) throw new Error();

    res.setHeader('Authorization', formatTkn(token));
    responseSuccess(res, httpStatus.OK, 'user login', 'user login success', user);
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.BAD_REQUEST, 'user login', 'user login falied');
  }
};
