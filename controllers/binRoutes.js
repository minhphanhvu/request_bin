const Bin = require('../models/bin')
const binHelper = require('../utils/bin_helper')
const binsRouter = require('express').Router()

// websocket
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server
const wss = new WebSocketServer({port: 8181})
const clients = {}

wss.on('connection', function(ws) {
  ws.on('message', async (incomingMes) => {
    let mes = JSON.parse(incomingMes)
    if (mes.newUrl) {
      clients[mes.newUrl] = ws
    } else {
      const bin = await Bin.findOne({url: mes.existingUrl})
      if (bin) {
        clients[bin.url] = ws
      } else {
        ws.close()
      }
    }
  })
})

// every 30seconds, check and terminate any dc ws clients
setInterval(() => {
  console.log(Object.keys(clients))
  for (const url in clients) {
    if (clients[url].readyState === WebSocket.CLOSED) {
      clients[url].close()
      delete clients[url]
    }
  }
}, 30000)

binsRouter.get(`/:binUrl/inspect`, async (req, res) => {
  const bin = await Bin.findOne({url: req.params.binUrl})

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
  const binUrl = req.params.binUrl
  const bin = await Bin.findOne({url: binUrl})

  if (bin) {
    const request = binHelper.parseRequest(req)
    clients[binUrl].send(JSON.stringify({request}))
    bin.requests.push(request)
    await bin.save()
    res.json({ success: `Your bin Url currently is: ${req.params.binUrl}` })
  } else {
    res.status(404).send({ error: `Not found.` })
  }
})

module.exports = binsRouter