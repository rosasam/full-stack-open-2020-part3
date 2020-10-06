const { json } = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else return " "
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendick",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => {
  // Generates a random ID with 15 digits
  return Math.round(Math.random() * Math.pow(10, 15))
}

app.get('/info', (request, response) => {
  const date = new Date()
  const nofPersons = persons.length
  response.send(
    `<div>Phonebook has info for ${nofPersons} people</div>` +
    `<div>${date}</div>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const person = persons.find(p => p.id === id)
  if (!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // Missing info constraint
  if (!(body.number && body.name)) {
    return response.status(400).json({
      error: 'name or number missing from request body'
    })
  }

  const {number, name} = body
  // Uniqueness constraint
  if (persons.find(p => p.name === name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  // Create and add new person to 'database'
  const id = generateId()
  const person = {name, number, id}
  persons = persons.concat(person)
  // Respond with a json describing persons
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
