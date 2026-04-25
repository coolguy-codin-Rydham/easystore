function notFound(_req, res) {
  res.status(404).json({ errorMessage: 'Not Found' });
}

function errorHandler(err, _req, res, _next) {
  if (err.code === 11000) {
    return res.status(400).json({ errorMessage: 'Duplicate value', fields: err.keyValue });
  }
  console.error('[error]', err);
  res.status(err.status || 500).json({ errorMessage: err.message || 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };
