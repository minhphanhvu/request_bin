import React from 'react'
import binService from '../services/bins'

const Bin = ({currentBinUrl, setBin, retrieveRequests}) => {
  const createNewBin = (e) => {
    e.preventDefault()
    binService.createBin()
      .then(returnedUrlObj => {
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
          <p>Your current url: {'https://finnvu.com/bin/' + currentBinUrl}</p>
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
    </>
  )
}

export default Bin