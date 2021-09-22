const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  received_at: { type: Date, default: Date.now },
  raw_request: { type: Object, required: true },
  headers: { type: Object },
  body: { type: Object },
  bin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bin'
  }
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request