require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const logger = require('./logger')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

// Middlewares
app.use(express.json())
app.use(logger)
app.use(cors())

// Routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

// Handle Errors
app.use(notFound)
app.use(handleError)

const PORT = 3001
const server = app.listen(PORT, () =>
  console.log('Server running on port: ', PORT)
)

module.exports = { app, server }
