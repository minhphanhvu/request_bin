const binHelper = require('../utils/bin_helper')

const urls = [
  {
    url: 'https://localhost:3002/abc',
    requests: [],
    created_at: Date.now,
  },
  {
    url: 'https://localhost:3002/edf',
    requests: [],
    created_at: Date.now,
  }
]

const notUniqueUrl = {
  url: 'https://localhost:3002/abc',
  requests: [],
  created_at: Date.now,
}

const uniqueUrl = {
  url: 'https://localhost:3002/xyz',
  requests: [],
  created_at: Date.now,
}

describe('check if url is unique', () => {
  test('if url is not unique, return false', () => {
    const result = binHelper.isUniqueUrl(notUniqueUrl, urls)
    expect(result).toBeFalsy()
  })

  test('if url is unique, return true', () => {
    const result = binHelper.isUniqueUrl(uniqueUrl, urls)
    expect(result).toBeTruthy()
  })
})