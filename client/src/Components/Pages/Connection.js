import React, { useState } from 'react'
import Index from '../Connection/Index'
import Loading from '../Loading/Loading'

export default function Connection() {
  let [isloading, setLoading] = useState(false)

  let handleLoading = (flag) => {
    setLoading(flag);
  }
  return (
    <div>
      <Index handleLoading={handleLoading} />
      {isloading && <Loading />}
    </div>
  )
}
