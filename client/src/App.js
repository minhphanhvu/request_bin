import './App.css';
import './styles/output.css'
import binService from './services/bins'
import React, { useState, useEffect } from 'react'

// componenets
import Bin from './components/Bin'
import Request from './components/Request'

// websocket
let ws;
ws = new WebSocket('ws://localhost:8181/ws')
// change this to your domain name in production, e.x.: finnvu.com/ws
// make sure to use wss secure connection -> 'wss://finnvu.com/ws'
// tell nginx to direct traffic to an exposed port for websocket only

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
      <header className="flex content-center justify-center p-4"><h1 className="text-9xl">Inspect HTTP Requests</h1></header>
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
