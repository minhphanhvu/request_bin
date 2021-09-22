// server/index.js

const express = require('express');
// utils
const config = require('./utils/config')
const logger = require('./utils/logger')
// controllers
const binsRouter = require('./controllers/binRoutes')

logger.info('Connecting to local mongodb: ', config.MONGODB_URI)

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI || `mongodb://localhost:27017/request_bin`)
        .then(() => {
          logger.info('connected to MongoDB')
        })
        .catch((err) => {
          logger.error('error connected to MongoDB', error.message)
        })

const app = express();
app.use(express.json())

app.use(`/api`, binsRouter)
// app.get(`/*`, (req, res) => {
//   console.log(req.params)
//   console.log(req.headers)
//   console.log(req.body)
//   console.log("This is a get request")
//   res.json({ message: "This is a get request" })
// })

// app.post(`/*`, (req, res) => {
//   console.log(req.params)
//   console.log(req.headers)
//   console.log(req.body)
//   console.log("This is a post request")
//   res.json({ message: "This is a post request" })
// })

module.exports = app