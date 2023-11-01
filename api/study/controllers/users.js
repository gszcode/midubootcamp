const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const allUsers = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })

  res.json(allUsers)
})

usersRouter.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = usersRouter
