dotenv = require('dotenv').config()
const { json } = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// LOGGER MIDDLEWARE
morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else return " "
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// TODO: Possibly deprecated
const generateId = () => {
  // Generates a random ID with 15 digits
  return Math.round(Math.random() * Math.pow(10, 15))
}

// INFO
app.get('/info', (request, response) => {
  const nofPersons = Person.count({}).then(count => {
    console.log('count ', count)
    const date = new Date()
    response.send(
      `<div>Phonebook has info for ${count} people</div>` +
      `<div>${date}</div>`
    )
  })
})

// GET ALL
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// GET ONE
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const person = Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

// CREATE
app.post('/api/persons', (request, response, next) => {
  const {number, name} = request.body

  // Missing info constraint
  if (!(number && name)) {
    return response.status(400).json({
      error: 'name or number missing from request body'
    })
  }

  // Create and save person to db
  const person = new Person({ name, number })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// UPDATE
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// UNKNOWN ENDPOINT MIDDLEWARE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// ERROR HANDLING MIDDLEWARE
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id ' })
  }
  next(error)
}
app.use(errorHandler)

// PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
