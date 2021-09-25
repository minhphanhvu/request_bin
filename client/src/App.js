import './App.css';
import binService from './services/bins'
import React, { useState, useEffect } from 'react'

// componenets
import Bin from './components/Bin'
import Request from './components/Request'

// websocket
let ws;
ws = new WebSocket('ws://localhost:8181/ws')

function App() {
  const [currentBinUrl, setBin] = useState('')
  const [requests, setRequests] = useState([])

  const queryParams = new URLSearchParams(window.location.search);
  const binUrl = queryParams.get('bin')

  ws.onmessage = function(e) {
    const request = JSON.parse(e.data).request
    const newRequests = requests.concat(request).sort((r1, r2) => r1.receivedAt < r2.receivedAt ? -1 : 1)
    setRequests(newRequests)
  }

  useEffect(() => {
    if (binUrl) {
      ws.onopen = function(e) { // check open connection before send
        ws.send(JSON.stringify({'existingUrl': binUrl}))
      }
      binService.getRequests(binUrl)
        .then((requests) => {
          setRequests(requests.sort((r1, r2) => r1.receivedAt > r2.receivedAt ? -1 : 1))
          setBin(binUrl)
        })
    }
  }, [])

  const createNewBin = (e) => {
    e.preventDefault()
    binService.createBin()
      .then(returnedUrlObj => {
        ws.send(JSON.stringify({'newUrl': returnedUrlObj.url}))
        setBin(returnedUrlObj.url)
      })
  }

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
        <Bin ws={ws} currentBinUrl={currentBinUrl} createNewBin={createNewBin} setBin={setBin} retrieveRequests={retrieveRequests} />
      }
      <Request requests={requests} binUrl={currentBinUrl} />
    </div>
  );
}

export default App;
