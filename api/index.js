const express = require('express')
const app = express()
let notes = [
  {
    id: 1,
    content: 'Soy una nota bebe',
    date: 'Hoy, creo',
    important: true
  },
  {
    id: 2,
    content: 'Soy una nota bebe',
    date: 'Hoy, creo',
    important: false
  },
  {
    id: 3,
    content: 'Soy una nota bebe',
    date: 'Hoy, creo',
    important: true
  }
]

// const http = require('http')

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   res.end(JSON.stringify(notes))
// })

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hola Gabys</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/note/:id', (req, res) => {
  let { id } = req.params
  const note = notes.find((note) => note.id === Number(id))

  res.json(note)
})

app.delete('/api/note/:id', (req, res) => {
  let { id } = req.params
  notes.find((note) => note.id !== Number(id))

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString
  }

  notes = [...notes, newNote]

  res.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
