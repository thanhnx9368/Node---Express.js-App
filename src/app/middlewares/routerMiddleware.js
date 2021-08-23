const Joi = require('joi')

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const result = schema.validate({ userId: req.params[name] })
    if (result.error) return res.status(400).json(result.error)
    next()
  }
}

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body)
    if (result.error) return res.status(400).json(result.error)
    next()
  }
}

const schemas = {
  idSchema: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  userSchema: Joi.object({
    firstName: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),
    courses: Joi.array().items(Joi.string()),
  }),

  editUserSchema: Joi.object({
    firstName: Joi.string().min(3).max(30),

    lastName: Joi.string().min(3).max(30),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),
    courses: Joi.array().items(Joi.string()),
  }),

  courseSchema: Joi.object({
    name: Joi.string().max(255).required(),

    description: Joi.string().max(600),

    videoId: Joi.string().required(),

    owner: Joi.array().items(Joi.string()),
  }),
}

module.exports = {
  validateParam,
  validateBody,
  schemas,
}
