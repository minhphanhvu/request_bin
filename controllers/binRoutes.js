const Bin = require('../models/bin')
const binHelper = require('../utils/bin_helper')
const binsRouter = require('express').Router()

binsRouter.get(`/:binUrl/inspect`, async (req, res) => {
  const bin = await Bin.findOne({url: req.params.binUrl})
  console.log(bin.requests)// remove this in production

  if (bin) {
    res.status(200).send({ requests: bin.requests })
  } else {
    res.status(404).send({ error: 'Bin not found' })
  }
})

binsRouter.post(`/generate`, async (req, res) => {
  const bins = await Bin.find({})
  const randomUrl = binHelper.generateUrl(bins)
  const newBin = new Bin({
    url: randomUrl
  })
  await newBin.save()
  res.status(200).send({ url: randomUrl })
})

binsRouter.all(`/:binUrl`, async (req, res) => {
  const bin = await Bin.findOne({url: req.params.binUrl})

  if (bin) {
    const request = binHelper.parseRequest(req)
    bin.requests.push(request)
    await bin.save()
    res.json({ success: `Your bin Url currently is: ${req.params.binUrl}` })
  } else {
    res.status(404).send({ error: `Not found.` })
  }
})

module.exports = binsRouter