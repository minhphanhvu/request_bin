const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const binSchema = new mongoose.Schema({
  url: { type: String, unique: true, required: true },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'request'
    }
  ],
  created_at: {type: Date, default: Date.now}
  },
)

binSchema.plugin(uniqueValidator)

const Bin = mongoose.model('Bin', binSchema)
module.exports = Bin