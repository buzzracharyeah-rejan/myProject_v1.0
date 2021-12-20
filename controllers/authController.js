const { httpStatus } = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return responseSuccess(
      res,
      httpStatus.CREATED,
      'signup',
      'user signup success',
      user
    );
  } catch (error) {
    console.log(error.message);
    return responseError(
      res,
      httpStatus.BAD_REQUEST,
      'error',
      'user signup failed'
    );
  }
};
