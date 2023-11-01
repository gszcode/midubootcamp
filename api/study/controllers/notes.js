const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', (request, response, next) => {
  Note.find({})
    .then((res) => {
      response.json(res)
    })
    .catch((err) => {
      next(err)
    })
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

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((res) => {
      response.status(204).json(res)
    })
    .catch((err) => {
      next(err)
    })
})

notesRouter.post('/', (request, response) => {
  const { content, important = false, userId } = request.body
  if (!content) return response.status(400).end()

  let user

  User.findById(userId)
    .then((foundUser) => {
      user = foundUser
      const note = new Note({
        content,
        date: new Date(),
        important,
        user: user._id
      })

      return note.save()
    })
    .then((savedNote) => {
      user.notes = user.notes.concat(savedNote._id)
      return user.save()
    })
    .then((savedNote) => {
      response.json(savedNote)
    })
})

notesRouter.put('/:id', (request, response, next) => {
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
