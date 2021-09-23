const shortid = require('shortid')
const { Request } = require('../models/request')
const stringify = require('json-stringify-safe')

const isUniqueUrl = (url, existingUrls) => {

  for (let i = 0; i < existingUrls.length; i++) {
    if (url.url === existingUrls[i].url) {
      return false
    }
  }

  return true
}

const generateUrl = (existingUrls) => {
  let url = shortid.generate()
  while (!isUniqueUrl(url, existingUrls)) {
    url = url + String(Math.floor(Math.random() * 1000 + 1))
  }

  return url
}

const parseRequest = (req) => {
  const ip = req.headers["x-forwarded-for"]
  return new Request({
    rawRequest: JSON.parse(stringify(req)),
    query: req.query,
    params: req.params,
    headers: req.headers,
    rawBody: req.rawBody,
    ip,
  })
}

module.exports = {
  isUniqueUrl,
  generateUrl,
  parseRequest
}