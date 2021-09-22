const Bin = require('../models/bin')
const Request = require('../models/request')

const urlsRouter = require('express').Router()

urlsRouter.get(`/*`, async (req, res) => {
  const url = req.originalUrl
  const bin = await Bin.findOne({url: url})
  console.log(bin)
  if (!bin) {
    res.status(404).send({url: 'url is non-existent'})
  } else {
    // .... process requests here
  }
})

module.exports = urlsRouter