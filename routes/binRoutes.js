const Bin = require('../models/bin')
const Request = require('../models/request')

module.exports = (app) => {
  app.get(`/api/bin`, async (req, res) => {
    let bins = await Bin.find();
    return res.status(200).send(bins);
  })

  app.get(`/api/request`, async (req, res) => {
    let requests = await Request.find();
    return res.status(200).send(requests)
  })
}