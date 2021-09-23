import './App.css';
import binService from './services/bins'
import React, { useState } from 'react'

// componenets
import Bin from './components/Bin'
import Request from './components/Request'

function App() {
  const [currentBinUrl, setBin] = useState('')
  const [requests, setRequests] = useState([])

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
      <Bin currentBinUrl={currentBinUrl} setBin={setBin} retrieveRequests={retrieveRequests} />
      <Request requests={requests} />
    </div>
  );
}

export default App;
