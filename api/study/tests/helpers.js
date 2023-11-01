const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo FullStack',
    important: true,
    date: new Date()
  },
  {
    content: 'Javascript',
    important: false,
    date: new Date()
  },
  {
    content: 'Tercer nota',
    important: true,
    date: new Date()
  }
]

const getAllNoteDb = async () => {
  const response = await api.get('/api/notes')

  return {
    contents: response.body.map((note) => note.content),
    response
  }
}

module.exports = { api, initialNotes, getAllNoteDb }
