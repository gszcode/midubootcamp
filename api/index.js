require('dotenv').config()
require('./mongo')

const express = require('express')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const app = express()
const Note = require('./models/Note')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hola Gabys</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.get('/api/note/:id', (req, res, next) => {
  let { id } = req.params

  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})

app.put('/api/note/:id', (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    date: note.date,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/note/:id', (req, res, next) => {
  let { id } = req.params

  Note.findByIdAndDelete(id)
    .then((note) => {
      res.status(204).json(note)
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then((savedNote) => {
    res.json(savedNote)
  })
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
