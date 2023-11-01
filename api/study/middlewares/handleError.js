module.exports = (err, req, res, next) => {
  console.error(err.name)

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'id used is malformed' })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      error: err.message
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(400).json({ error: 'token missing or invalid' })
  } else if (err.name === 'TokenExpirerError') {
    res.status(400).json({ error: 'token expired' })
  } else {
    res.status(500).end()
  }
}
