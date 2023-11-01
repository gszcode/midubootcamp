const supertest = require('supertest')
const User = require('../models/User')
const { app, server } = require('../index')
const api = supertest(app)
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Gabys', name: 'Gaby', passwordHash })
    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersDb = await User.find({})
    const usersAtStart = usersDb.map((user) => user.toJSON())

    const newUser = {
      username: 'Gabito',
      name: 'Gaby Sanchez',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usersAtEnd = users.map((user) => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersDb = await User.find({})
    const usersAtStart = usersDb.map((user) => user.toJSON())

    const newUser = {
      username: 'Gabys',
      name: 'GabySanchez',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usersAtEnd = users.map((user) => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.errors.username.message).toContain(
      '`username` to be unique'
    )
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
