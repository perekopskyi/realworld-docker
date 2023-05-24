const express = require('express')
const axios = require('axios')
const { connectDB } = require('./helpers/db')
const { PORT, HOST, API_URL } = require('./config')
const app = express()

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 ~> Server auth is running on PORT=${PORT}`)
  })
}

app.get('/test', (req, res) => {
  res.send('Our auth server working correctly')
})

app.get('/testWithApiData', (req, res) => {
  axios.get(`${API_URL}/testapidata`).then(response => {
    res.json({
      testWithApiData: true,
      data: response.data.testapidata,
    })
  })
})

app.get('/api/currentUser', (req, res) => {
  res.json({ id: 12345, email: 'yevhen@gmail.com' })
})

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer)
