const shortid = require('shortid')

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

module.exports = {
  isUniqueUrl,
  generateUrl
}