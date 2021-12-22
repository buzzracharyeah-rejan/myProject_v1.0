require('dotenv').config();
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const Property = require('../models/property');
const { getCoordinates } = require('../utils/getCoordinates');
const { kmConversion } = require('../utils/unit');

exports.createProperty = async (req, res, next) => {
  try {
    const address = req.body.address;
    const response = await getCoordinates(address);
    const { longitude, latitude } = response.data[0];
    // console.log(longitude, latitude);

    //delete address from req.body
    delete req.body.address;
    // console.log(typeof address);

    const property = new Property({
      ...req.body,
      location: {
        location_geoJSON: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        address,
      },
    });
    await property.save();

    responseSuccess(res, httpStatus.CREATED, 'add property', 'new property created', property);
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.BAD_REQUEST, 'add property', error.message);
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
    if (!property) throw new Error();

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

    const property = await Property.findById(_id);
    if (!property) throw new Error();
    // console.log(property);
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

exports.searchProperty = async (req, res, next) => {
  try {
    // const location = req.query.location;
    const { location, price } = req.query;
    const valuation = price || 0;

    const radius = req.query.radius || 16.093;

    // convert radius in km to mile
    const mile = kmConversion(radius);
    // const meter = radius * 1000;

    const response = await getCoordinates(location);
    const { longitude, latitude } = response.data[0];
    console.log(longitude, latitude);

    const property = await Property.find({
      'location.location_geoJSON': { $geoWithin: { $centerSphere: [[longitude, latitude], mile / 3963.2] } },
      valuation: { $gt: valuation },
    });
    // console.log(property);
    // const property = await Property.aggregate([
    //   {
    //     near: {
    //       type: 'Point',
    //       coordinates: [longitude, latitude],
    //     },
    //     distanceField: 'dist.calculated',
    //     maxDistance: meter,
    //     spherical: true,
    //   },
    // ]);

    responseSuccess(res, httpStatus.OK, 'search location', 'search location success', property);
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.BAD_REQUEST, 'search location', 'search location failed');
  }
};
