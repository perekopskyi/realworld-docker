const express = require('express')
const axios = require('axios')
const { connectDB } = require('./helpers/db')
const { PORT, HOST, AUTH_API_URL } = require('./config')
const { default: mongoose } = require('mongoose')
const app = express()

const postSchema = new mongoose.Schema({
  name: String,
})
const Post = mongoose.model('Post', postSchema)

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 ~> Server is running on PORT=${PORT}`)
    console.log(`🚀 ~> On host ${HOST}`)
  })
}

app.get('/test', (req, res) => {
  res.send('Our api server working correctly')
})
app.get('/testapidata', (req, res) => {
  res.json({
    testapidata: true,
  })
})
app.get('/testWithCurrentUser', (req, res) => {
  axios.get(`${AUTH_API_URL}/currentUser`).then(response => {
    res.json({
      testWithCurrentUser: true,
      currentUserFromAuth: response.data,
    })
  })
})

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer)
