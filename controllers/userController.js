const User = require('../models/user');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');

exports.updateUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate({ _id }, { $set: { ...req.body } }, { new: true });
    // console.log(user);
    responseSuccess(res, httpStatus.OK, 'update user', 'update user success', user);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'update user', 'update user failed');
  }
};

exports.deleteUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    responseSuccess(res, httpStatus.CREATED, 'delete user', 'delete user success', user);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'delete user', 'delete user failed');
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    responseSuccess(res, httpStatus.OK, 'get user', 'get user success', users);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'get user', 'get user failed');
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) throw new Error();
    responseSuccess(res, httpStatus.OK, 'get user', 'get user success', user);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'get user', 'get user failed');
  }
};
