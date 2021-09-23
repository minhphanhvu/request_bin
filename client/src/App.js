import './App.css';
import binService from './services/bins'
import React, { useState } from 'react'

function App() {
  const [currentBinUrl, setBin] = useState('')
  const [requests, setRequests] = useState([])

  const createNewBin = (e) => {
    e.preventDefault()
    binService.createBin()
      .then(returnedUrlObj => {
        setBin(returnedUrlObj.url)
      })
  }

  const retrieveRequests = (e, url) => {
    e.preventDefault()
    binService.getRequests(url)
      .then(requests => {
        setRequests(requests)
      })
  }

  return (
    <div className="App">
      <section id="bin-generate">
      { !currentBinUrl
        ? 
        <button onClick={createNewBin}>Create a bin</button> 
        :
        <div>
          <p>Your current url: 
            {'https://finnvu.com/bin/' + currentBinUrl}
          </p>
          <p>
            To inspect, click here:
            <button onClick={(e) => retrieveRequests(e, '/' + currentBinUrl)}> inspect
            </button>
            <p>
            or pass the inspect link to get JSON data: https://finnvu.com/bin/{currentBinUrl}/inspect
            </p>
          </p>
        </div>
      }
      </section>
      <section id="bin-inspect">
        {requests.map(r => {
          return (
          <>
            <div id="query-params">
              query/params
              {r.query || r.params ?
                <>
                  <p>{JSON.stringify(r.query)}</p>
                  <p>{JSON.stringify(r.params)}</p>
                </>
                :
                <>
                </>
              }
            </div>
            <div id="headers">
              {Object.keys(r.headers).map(key => {
                return (
                  <>
                    return <p><strong>{key}</strong>: {r.headers[key]}</p>
                  </>
                )
              })}
            </div>
            <div id="raw-body">
              Raw-body
              {r.rawBody}
            </div>
          </>)
        })}
      </section>
    </div>
  );
}

export default App;
