require('dotenv').config()
require('./mongo')

const express = require('express')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const app = express()
const usersRoutes = require('./controllers/users')
const notesRoutes = require('./controllers/notes')
const loginRoutes = require('./controllers/login')

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/login', loginRoutes)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})

module.exports = { app, server }
