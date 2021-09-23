import axios from 'axios'
const baseUrl = '/bin'

const createBin = async () => {
  const newBin = await axios.post(baseUrl + '/generate')
  return newBin.data
}

const getRequests = async (binUrl) => {
  const requests = await axios.get(baseUrl + `/${binUrl}/inspect`)

  return requests.data.requests
}

export default { createBin, getRequests }