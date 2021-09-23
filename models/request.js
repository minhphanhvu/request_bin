const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  receivedAt: { type: Date, default: Date.now },
  rawRequest: Object,
  query: Object,
  params: Object,
  headers: Object,
  rawBody: String,
  ip: String,
})

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = {
  Request,
  requestSchema
}