const Schema = require('../models/validation');
const { StatusCodes } = require('http-status-codes');
const { responseError } = require('../helpers/responseHelper');

exports.validateSchema = async (req, res, next) => {
  try {
    const isValidate = await Schema.validate(req.body);
    if (!isValidate.error) next();
    throw new Error(isValidate.error);
  } catch (error) {
    responseError(
      res,
      StatusCodes.BAD_REQUEST,
      'validation error',
      error.message
    );
  }
};
