'use strict'

const createApp = require('./app')

const port = process.env.PORT || 3001
const app = createApp()

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})

// TODO Add signal handling
// TODO Add shutdown handling
