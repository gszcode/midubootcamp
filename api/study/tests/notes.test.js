const { server } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { api, initialNotes, getAllNoteDb } = require('./helpers')
const { describe } = require('test')

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('the first note is about FullStack', async () => {
    const { contents } = await getAllNoteDb()

    expect(contents).toContain('Aprendiendo FullStack')
  })
})

describe('POST /api/notes', () => {
  test('a valid note can be added', async () => {
    const note = {
      content: 'Nueva nota',
      important: true,
      date: new Date()
    }

    await api
      .post('/api/notes')
      .send(note)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllNoteDb()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(note.content)
  })

  test('note without content is not added', async () => {
    const note = {
      important: true,
      date: new Date()
    }

    await api.post('/api/notes').send(note).expect(400)

    const { response } = await getAllNoteDb()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
