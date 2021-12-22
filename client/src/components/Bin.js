import React from 'react'

const Bin = ({currentBinUrl, createNewBin, retrieveRequests}) => {

  return (
    <>
    <section className="pt-5">
      { !currentBinUrl
        ? 
        <div>
        <p>
          RequestBin gives you a URL that will collect requests made to it and let you inspect them in a human-friendly way
        </p>
        <p>
          Use RequestBin to see what your HTTP client is sending or to inspect and debug webhook requests.
        </p>
        <button className="border-2 px-4 py-2 mt-4 border-gray-900 hover:border-blue-400 bg-indigo-900 rounded-md" onClick={createNewBin}>
          <p className="text-white">Create a bin</p>
        </button>
        </div>
        :
        <div className="my-2">
          <p>Your current url: <strong>{'https://finnvu.com/bin/' + currentBinUrl}</strong></p>
          <p>
            Click here to manually update and inspect: <button className="border-2 px-4 py-1 border-gray-900 hover:border-blue-400 bg-indigo-900 rounded-md" onClick={(e) => retrieveRequests(e, '/' + currentBinUrl)}>
                                    <p className="text-white">inspect</p>
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