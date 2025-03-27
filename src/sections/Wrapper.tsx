import React from 'react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className='content'>{children}</div>
}

export default Wrapper
