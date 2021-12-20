const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const Property = require('../models/property');
exports.createProperty = async (req, res, next) => {
  try {
    const property = new Property(req.body);
    await property.save();
    responseSuccess(
      res,
      httpStatus.CREATED,
      'add property',
      'new property created',
      property
    );
  } catch (error) {
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'error',
      'create property failed'
    );
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    responseSuccess(
      res,
      httpStatus.OK,
      'Get Property',
      'List of properties',
      properties
    );
  } catch (error) {
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'get property',
      'properties listing failed'
    );
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const property = await Property.findById(_id);
    responseSuccess(
      res,
      httpStatus.OK,
      'Get Property',
      'List of properties',
      property
    );
  } catch (error) {
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'get property',
      'properties listing failed'
    );
  }
};
exports.updateProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const allowedUpdates = [
      'propertyType',
      'propertyName',
      'description',
      'location',
      'valuation',
      'isSold',
      'owner',
    ];
    const updates = Object.keys(req.body);
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) throw new Error();

    const property = await Property.findOne({ _id });
    const updatedProperty = updates.forEach(
      (update) => (property[update] = req.body[update])
    );
    await updatedProperty.save();
    responseSuccess(
      res,
      httpStatus.CREATED,
      'update property',
      'property updated',
      updatedPropety
    );
  } catch (error) {
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'error',
      'update property failed'
    );
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const property = await Property.findByIdAndDelete(_id);
    responseSuccess(
      res,
      httpStatus.CREATED,
      'delete property',
      'property deleted successful',
      property
    );
  } catch (error) {
    responseError(
      res,
      httpStatus.BAD_REQUEST,
      'error',
      'delete property failed'
    );
  }
};
