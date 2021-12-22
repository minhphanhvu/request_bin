import React from 'react'

const Request = ({requests, binUrl}) => {
  return (
    <>
      {binUrl && requests.length === 0 ? 
        <>
          <p className="mt-5">Currently there is no requests made yet.</p>
        </>
        :
        ''
      }
      {requests.length === 0 ? 
        ''
        :
        <div className="mt-5">
          <section id="bin-inspect">
          {requests.map(r => {
            return (
            <div className="request flex-auto border-2 border-black-900 rounded-tr-md rounded-br-md mb-4">
              <div className="info" id="query-params">
                <h5 className="title">FORM/PARAMS</h5>
                {r.params ?
                  <>
                    <p>{JSON.stringify(r.params)}</p>
                  </>
                  :
                  <>
                  </>
                }
              </div>
              <h5 className="title">HEADERS</h5>
              <div className="info" id="headers">
                {Object.keys(r.headers).map(key => {
                  return (
                    <>
                      <p><strong>{key[0].toUpperCase() + key.slice(1)}</strong>: {r.headers[key]}</p>
                    </>
                  )
                })}
              </div>
              <div className="info">
                <h5 className="title">RAW-BODY</h5>
                {r.rawBody ? 
                  <pre className="body prettyprint" id="raw-body">{r.rawBody.replace(/\s+/g, '')}</pre>
                  :
                  ''
                }
              </div>
            </div>)
          })}
          </section>
        </div>
      }
    </>
  )
}

export default Request