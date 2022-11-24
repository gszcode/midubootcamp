const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo FullStack JS',
    important: true,
    date: new Date()
  },
  {
    content: 'Seguime en Gabyss.ok',
    important: true,
    date: new Date()
  }
]

module.exports = { api, initialNotes }
