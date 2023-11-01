const mongoose = require('mongoose')
const { MONGODB_URI, TEST_MONGODB_URI, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI

mongoose
  .connect(connectionString)
  .then((res) => console.log('Todo OK!'))
  .catch((err) => console.log('Errorsito', err))

module.exports = mongoose
