const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log('Todo OK!'))
  .catch((err) => console.log('Errorsito', err))

module.exports = mongoose
