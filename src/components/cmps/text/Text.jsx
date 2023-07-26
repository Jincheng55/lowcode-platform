const Text = ({ cmp }) => {
  if (cmp.type === 'text') return <p>{cmp.content}</p>
  return <h2>{cmp.content}</h2>
}

export default Text