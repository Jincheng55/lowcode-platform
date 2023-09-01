const Text = ({ cmp }) => {
  if (cmp.type === 'p') return <p>{cmp.content}</p>
  return <h3>{cmp.content}</h3>
}

export default Text