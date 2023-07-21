const Text = ({ cmp }) => {
  if (cmp.type === 'text') return <p style={cmp.style}>{cmp.content}</p>
  return <h1 style={cmp.style}>{cmp.content}</h1>
}

export default Text