module.exports = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'CastError') {
    res.status(400).end()
  } else {
    res.status(500).end()
  }
}
