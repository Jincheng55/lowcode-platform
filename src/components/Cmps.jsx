import React from 'react'

const Cmp = ({ cmp }) => {
  return (
    <div style={cmp.style}>{cmp.content}</div>
  )
}

export default Cmp