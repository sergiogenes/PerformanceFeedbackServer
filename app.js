'use strict'

const express = require('express')
const volleyball = require('volleyball')
const cookieParser = require('cookie-parser')
const cors = require('cors')

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

  app.use('/', (req, res) => res.sendStatus(404))

  // TODO Maybe add custom error handler middleware

  return app
}

module.exports = createApp
