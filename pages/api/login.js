export default (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).end()
  }

  const { password } = req.body

  if (password === process.env.PASSWORD) {
    return res.status(200).end()
  }

  return res.status(401).end()
}
