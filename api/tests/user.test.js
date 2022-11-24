const bcrypt = require('bcrypt')
const User = require('../models/User')
const api = require('./helpers')
const mongoose = require('mongoose')
const server = require('../index')

describe.only('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'gabyroot', passwordHash })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map((user) => user.toJSON())

    const newUser = {
      username: 'gabysanchez',
      name: 'Gaby',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userDBAfter = await User.find({})
    const usersAtEnd = userDBAfter.map((user) => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usersnames = usersAtEnd.map((u) => u.username)
    expect(usersnames).toContain(newUser.username)
  })

  // afterAll(() => {
  //   mongoose.connection.close()
  //   server.close()
  // })
})
