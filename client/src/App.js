import './App.css';
import binService from './services/bins'
import React, { useState, useEffect } from 'react'

// componenets
import Bin from './components/Bin'
import Request from './components/Request'

function App() {
  const [currentBinUrl, setBin] = useState('')
  const [requests, setRequests] = useState([])

  const queryParams = new URLSearchParams(window.location.search);
  const binUrl = queryParams.get('bin')

  useEffect(() => {
    binService.getRequests(binUrl)
      .then((requests) => {
        setRequests(requests.sort((r1, r2) => r1.receivedAt > r2.receivedAt ? -1 : 1))
        setBin(binUrl)
      })
  }, [])

  const retrieveRequests = (e, url) => {
    e.preventDefault()
    binService.getRequests(url)
      .then(requests => {
        setRequests(requests.sort((r1, r2) => r1.receivedAt > r2.receivedAt ? -1 : 1))
      })
  }

  return (
    <div className="App">
      <header>Inspect HTTP Requests</header>
      {requests.length !== 0 ?
        ''
        :
        <Bin currentBinUrl={currentBinUrl} setBin={setBin} retrieveRequests={retrieveRequests} />
      }
      <Request requests={requests} binUrl={currentBinUrl} />
    </div>
  );
}

export default App;
