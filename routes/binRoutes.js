const Bin = require('../models/bin')
const Request = require('../models/request')

module.exports = (app) => {
  app.get(`/api/bin/generate`, async (req, res) => {
    const randomUrl = 'http://localhost:3001/xyz' // Write a function to generate random string here
    const newBin = new Bin({
      url: randomUrl
    })
    newBin.save()
    return res.status(200).send(randomUrl)
  })

  app.get(`/api/request/generate`, async (req, res) => {
    const firstBin = await Bin.findOne({url: 'http://localhost:3001/xyz'})
    const newRequest = new Request({
      raw_request: {name: 'random name'},
      bin: firstBin._id,
    })
    await newRequest.save()
    firstBin.requests = firstBin.requests.concat(newRequest._id)
    await firstBin.save()

    return res.status(200).send(newRequest)
  })

  app.get(`/api/bin`, async (req, res) => {
    const bins = await Bin.find();
    return res.status(200).send(bins);
  })

  app.get(`/api/request`, async (req, res) => {
    const requests = await Request.find();
    return res.status(200).send(requests)
  })
}