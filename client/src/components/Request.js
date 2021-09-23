import React from 'react'

const Request = ({requests}) => {
  return (
    <>
      {requests.length === 0 ? 
        <>
          There is no request made yet.
        </>
        :
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
      }
    </>
  )
}

export default Request