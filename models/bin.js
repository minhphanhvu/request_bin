const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const binSchema = new mongoose.Schema({
  url: { type: String, unique: true, required: true },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    }
  ],
  created_at: {type: Date, default: Date.now}
  },
)

binSchema.plugin(uniqueValidator)

binSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Bin = mongoose.model('Bin', binSchema)
module.exports = Bin