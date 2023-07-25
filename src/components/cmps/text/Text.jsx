const Text = ({ cmp }) => {
  if (cmp.type === 'text') return <p style={cmp.style}>{cmp.content}</p>
  return <h2 style={cmp.style}>{cmp.content}</h2>
}

export default Text