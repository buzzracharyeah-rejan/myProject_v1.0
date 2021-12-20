const Joi = require('joi');

const Schema = Joi.object({
  firstname: Joi.string().alphanum().min(5).max(30).required(),
  lastname: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  contactNumber: Joi.number(),
  displayAddress: Joi.string().alphanum().min(5).max(30).required(),
});

module.exports = Schema;
