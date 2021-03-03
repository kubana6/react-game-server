const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(`token authorization ${token}`)
    if (!token) {
      console.log(token + "false token ")
      return res.json({ message: 'you are not logged in' })
    }
    const decoded = jwt.verify(token, config.get('secretKey'))
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' })
  }
}
