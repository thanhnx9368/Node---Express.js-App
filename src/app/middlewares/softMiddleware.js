module.exports = function softMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: 'default',
    column: '',
  }

  if (req.query.hasOwnProperty('_sort')) {
    res.locals._sort = Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type,
      column: req.query.column,
    })
  }
  next()
}
