const mongoose = require('mongoose')
const connectionString = process.env.MONGODB

// coneccion a mongodb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.error(err)
  })
