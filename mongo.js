const mongoose = require('mongoose')

if (process.argv.length !== 3 || process.argv.length !== 5) {
  console.log('Invalid number of arguments. \nShould be "node mongo.js <password>" or "node mongo.js <password> <name> <number>"')
  process.exit(1)
}

// Connect to db
const password = process.argv[2]
const url = `mongodb+srv://shallan:${password}@fso-part3.nmqz3.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// Define a Person db model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // List all persons
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  // Create new person
  const [name, number] = process.argv.slice(3, 5)
  const person = new Person({ name, number })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    console.log(result)
    mongoose.connection.close()
  })
}

