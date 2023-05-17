'use strict'

const express = require('express')
const volleyball = require('volleyball')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { User } = require('./models')

const routes = require('./routes')

const createApp = () => {
  const app = express()
  app.use(volleyball)
  app.use(express.json())
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  )

  app.use('/', routes)

  app.use('/', (req, res) => {
    res.send('Wellcome a Backend of Feedback Performance!')
  })

  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.send(err)
  })

  return app
}

module.exports = createApp
