'use strict';

const Joi = require('joi');

module.exports.get = {
  params: Joi.object().keys({
    id: Joi.number()
          .integer()
          .positive()
          .required()
  })
};

module.exports.post = {
  body: Joi.object().keys({
    parentFolder: Joi.number()
          .integer()
          .positive(),
    name: Joi.string()
          .trim()
          .min(1)
          .max(50),
    content: Joi.string()
  })
};
//
// module.exports.patch = {
//   body: Joi.object().keys({
//     firstName: Joi.string()
//           .trim()
//           .alphanum()
//           .min(1)
//           .max(20),
//     email: Joi.string()
//           .trim()
//           .email(),
//     password: Joi.string()
//           .trim()
//           .min(8)
//           .max(256)
//   }).or('firstName', 'email', 'password'),
//
//   params: Joi.object().keys({
//     id: Joi.number()
//           .integer()
//           .positive()
//           .required()
//   })
// };
//
// module.exports.delete = {
//   params: Joi.object().keys({
//     id: Joi.number()
//           .integer()
//           .positive()
//           .required()
//   })
// };
