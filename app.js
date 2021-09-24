const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('express-async-errors');
// utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
// controllers
const binsRouter = require('./controllers/binRoutes')

logger.info('Connecting to local mongodb: ', config.MONGODB_URI)

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI || `mongodb://localhost:27017/request_bin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('connected to MongoDB')
}).catch((err) => {
  logger.error('error connected to MongoDB', err.message)
})

const rawBody = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

const options = {
  verify: rawBody
}

app.use(bodyParser.json(options)) // Can we parse this when it hits the binUrl route instead?

// main routes
app.use(`/bin`, binsRouter)

// middleware and utils
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app