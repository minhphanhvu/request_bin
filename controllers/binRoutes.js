const Bin = require('../models/bin')
const binHelper = require('../utils/bin_helper')
const binsRouter = require('express').Router()

binsRouter.get(`/bin/generate`, async (req, res) => {
  const bins = await Bin.find({})
  const randomUrl = binHelper.generateUrl(bins)
  const newBin = new Bin({
    url: randomUrl
  })
  await newBin.save()
  return res.status(200).send({ url: randomUrl })
})

module.exports = binsRouter