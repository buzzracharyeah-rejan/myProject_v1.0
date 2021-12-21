const Joi = require('joi');

const userSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).trim().lowercase().required(),
  lastname: Joi.string().alphanum().min(3).max(30).trim().lowercase().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .trim()
    .lowercase()
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  contactNumber: Joi.number(),
  displayAddress: Joi.string().alphanum().min(5).max(30).trim().lowercase().required(),
  userType: Joi.string().valid('admin', 'buyer', 'owner'),
});

const propertySchema = Joi.object({
  propertyName: Joi.string().min(5).max(30).trim().lowercase().required(),
  propertyType: Joi.string().valid('rent', 'sale'),
  address: Joi.string().min(5).max(30).trim().lowercase().required(),
  description: Joi.string().trim().lowercase().required(),
  valuation: Joi.number(),
  isSold: Joi.boolean(),
  owner: Joi.string(),
});

module.exports = { userSchema, propertySchema };
