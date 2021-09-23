import React from 'react'

const Request = ({requests}) => {
  return (
    <>
      {requests.length === 0 ? 
        <>
          <p>Currently there is no request made yet to inspect.</p>
        </>
        :
        <div className="">
          <section className="" id="bin-inspect">
          {requests.map(r => {
            return (
            <div className="request">
              <div className="info" id="query-params">
                <h5 className="title">QUERY/PARAMS</h5>
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
              <h5 className="title">HEADERS</h5>
              <div className="info" id="headers">
                {Object.keys(r.headers).map(key => {
                  return (
                    <>
                      <p><strong>{key[0].toUpperCase() + key.slice(1)}</strong>: 
                      {r.headers[key]}</p>
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