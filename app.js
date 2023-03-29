const express = require('express')
const volleyball = require('volleyball')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const db = require('./models')
const routes = require('./routes')
const fake = require('./fakeuser')

const app = express()
const PORT = process.env.PORT || 3001

app.use(volleyball)
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: true,
  })
)
app.use('/', routes)

app.use('/api', (req, res) => res.sendStatus(404))

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send(err)
})

db.sequelize.sync({ force: false }).then(() => {
  console.log('Db connected')
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
  })
})
