const Joi = require('joi');
const pick = require('../utils/pick');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    res.status(400).send(JSON.stringify({'failed':'Enter valid details'}));
  }else{
  return next();
  }
};

module.exports = validate;