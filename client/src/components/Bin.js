import React from 'react'
import binService from '../services/bins'

const Bin = ({currentBinUrl, setBin, retrieveRequests, ws}) => {
  const createNewBin = (e) => {
    e.preventDefault()
    binService.createBin()
      .then(returnedUrlObj => {
        // Why cant I check connection here?
        ws.send(JSON.stringify({'newUrl': returnedUrlObj.url}))
        setBin(returnedUrlObj.url)
      })
  }

  return (
    <>
    <section id="bin-generate">
      { !currentBinUrl
        ? 
        <button onClick={createNewBin}>Create a bin</button> 
        :
        <div>
          <p>Your current url: <strong>{'https://finnvu.com/bin/' + currentBinUrl}</strong></p>
          <p>
            Click here to manually update and inspect: <button onClick={(e) => retrieveRequests(e, '/' + currentBinUrl)}>
                                    inspect
                                    </button>
            <p>
            or pass the inspect link to get JSON data: <strong>https://finnvu.com/bin/{currentBinUrl}/inspect</strong>
            </p>
            <p>
              Remember your binUrl to get back to this UI with this link: <strong>https://finnvu.com/requestbin?bin={currentBinUrl}</strong>
            </p>
          </p>
        </div>
      }
    </section>
    </>
  )
}

export default Bin