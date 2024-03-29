const notesRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', async (request, response, next) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })

  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
})

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((res) => {
      response.status(204).json(res)
    })
    .catch((err) => {
      next(err)
    })
})

notesRouter.post('/', userExtractor, async (request, response) => {
  const { content, important = false } = request.body
  const { userId } = request

  if (!content) return response.status(400).end()
  const user = await User.findById(userId)

  const note = new Note({
    content,
    date: new Date(),
    important,
    user: userId.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
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

module.exports = notesRouter
