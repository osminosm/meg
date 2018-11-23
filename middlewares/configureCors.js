const cors = require('cors')

module.exports = () => cors({
  origin: ["http://localhost:3000", "https://www.osmanonline.com"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
})