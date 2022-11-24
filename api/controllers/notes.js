const notesRoutes = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

notesRoutes.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })

  res.json(notes)
})

notesRoutes.get('/:id', (req, res, next) => {
  let { id } = req.params

  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})

notesRoutes.put('/:id', userExtractor, (req, res, next) => {
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

notesRoutes.delete('/:id', userExtractor, (req, res, next) => {
  let { id } = req.params

  Note.findByIdAndDelete(id)
    .then((note) => {
      res.status(204).json(note)
    })
    .catch((error) => {
      next(error)
    })
})

notesRoutes.post('/', userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body

  const user = await User.findById(req.userId)

  if (!content) {
    return res.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRoutes
