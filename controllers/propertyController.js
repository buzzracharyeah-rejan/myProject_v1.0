require('dotenv').config();
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const Property = require('../models/property');
const { getCoordinates } = require('../utils/getCoordinates');

exports.createProperty = async (req, res, next) => {
  try {
    const address = req.body.address;
    const response = await getCoordinates(address);
    const { longitude, latitude } = response.data[0];

    //delete address from req.body
    delete req.body.address;

    const property = new Property({
      ...req.body,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
        address,
      },
    });
    await property.save();

    responseSuccess(res, httpStatus.CREATED, 'add property', 'new property created', property);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'error', error.message);
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    responseSuccess(res, httpStatus.OK, 'Get Property', 'List of properties', properties);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'get property', 'properties listing failed');
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const property = await Property.findById(_id);
    responseSuccess(res, httpStatus.OK, 'Get Property', 'List of properties', property);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'get property', 'properties listing failed');
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const allowedUpdates = ['propertyType', 'propertyName', 'description', 'location', 'valuation', 'isSold', 'owner'];
    const updates = Object.keys(req.body);
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) throw new Error();

    const property = await Property.findById({ _id });
    console.log(property);
    updates.forEach((update) => (property[update] = req.body[update]));
    // await updatedProperty.save();
    responseSuccess(res, httpStatus.NO_CONTENT, 'update property', 'property updated', updatedPropety);
  } catch (error) {
    console.log(error);
    responseError(res, httpStatus.BAD_REQUEST, 'error', 'update property failed');
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const property = await Property.findByIdAndDelete(_id);
    responseSuccess(res, httpStatus.NO_CONTENT, 'delete property', 'property deleted successful', property);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'error', 'delete property failed');
  }
};
