const express = require('express');
const app = express();
require('express-async-errors');
// utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
// controllers
const binsRouter = require('./controllers/binRoutes')
const urlsRouter = require('./controllers/urlsRoutes')

logger.info('Connecting to local mongodb: ', config.MONGODB_URI)

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI || `mongodb://localhost:27017/request_bin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('connected to MongoDB')
}).catch((err) => {
  logger.error('error connected to MongoDB', error.message)
})

app.use((req, res, next) => {
  console.log(req)
  // process raw request here
  next()
})
app.use(express.json())

// main routes
app.use(`/api`, binsRouter)
app.use(`/`, urlsRouter)

// middleware and utils
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app