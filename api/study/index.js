require('dotenv').config()
require('./mongo')
const Note = require('./models/Note')
const express = require('express')
const app = express()
const logger = require('./logger')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')

app.use(express.json())
app.use(logger)
app.use(cors())

app.get('/', (request, response) => {
  response.send('Hoitas')
})
app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
})
app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
})
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((res) => {
      response.status(204).json(res)
    })
    .catch((err) => {
      next(err)
    })
})
app.post('/api/notes/', (request, response, next) => {
  const { content, important } = request.body

  const note = new Note({
    content,
    date: new Date(),
    important
  })
  note
    .save()
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
})
app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    id,
    {
      content,
      date: new Date(),
      important
    },
    { new: true }
  )
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
})

app.use(notFound)
app.use(handleError)

const PORT = 3001
app.listen(PORT, () => console.log('Server running on port: ', PORT))
