const httpStatus = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { generateToken } = require('../utils/generateToken');
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
    const user = req.user;
    const { _id, userType } = user;
    const token = await generateToken({ _id, userType });
    // console.log(token);

    if (!token) throw new Error();

    const myUser = await User.findOne(_id);
    const updatedUser = await myUser.addToken(token);
    // console.log(updatedUser);

    res.setHeader('Authorization', 'Bearer ' + token);

    responseSuccess(res, httpStatus.OK, 'user login', 'user login success', updatedUser);
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.BAD_REQUEST, 'user login', 'user login falied');
  }
};
