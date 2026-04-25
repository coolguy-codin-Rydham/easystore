function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = {};
      for (const d of error.details) errors[d.path[0]] = d.message;
      return res.status(400).json(errors);
    }
    req[source] = value;
    next();
  };
}

module.exports = { validate };
