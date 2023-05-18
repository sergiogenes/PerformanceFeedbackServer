'use strict'

const createApp = require('./app')
const db = require('./db')

const port = process.env.PORT || 3001
const app = createApp()

db.sync({ force: false }).then(() => {
  console.log('Data Base Connect')

  app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  })
})

// TODO Add signal handling
// TODO Add shutdown handling
