const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

// Number should have at least 8 digits
const numberValidator = number => {
  return number.replace(/[^0-9]/g, "").length >= 8
}

// Define a Person db model
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: numberValidator,
        message: 'Phone number must have at least 8 digits.' 
      }
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
   
module.exports = Person