const Schema = require('../models/validation');

const httpStatus = require('../constants/generalConstants');
const { responseError } = require('../helpers/responseHelper');

exports.validateSchema = async (req, res, next) => {
  try {
    const isValidate = await Schema.validate(req.body);
    console.log(isValidate);
    if (isValidate.error) {
      throw new Error(isValidate.error);
    }
    next();
  } catch (error) {
    console.error(error.stack);
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'validation error',
      error.message
    );
  }
};
