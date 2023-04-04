const { describe, before, after, test } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')

const createApp = require('../app')
const db = require('../models')

const app = createApp()

describe('User', () => {
  const administrator = {
    isAdmin: true,
    firstName: 'admin',
    lastName: 'istrator',
    password: '12345678',
    email: 'admin@example.com',
    fileNumber: '1',
  }

  before(async () => {
    await db.sequelize.sync({ force: true })
    await db.User.create(administrator)
  })

  after(() => db.sequelize.close())

  test('Cannot login with non-registered email', async () => {
    const nonRegisteredEmail = 'nonregistered@example.com'
    const response = await request(app)
      .post('/auth/login')
      .send({ email: nonRegisteredEmail, password: administrator.password })
  })

  test('Cannot login with wrong password', async () => {
    const wrongPassword = '87654321'
    const response = await request(app)
      .post('/auth/login')
      .send({ email: administrator.email, password: wrongPassword })
  })

  test('Cannot create new users if not an administrator', async () => {
    const response = await request(app).post('/users')

    assert.deepEqual(response.statusCode, 401)
  })

  test('Can create new users if an administrator', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: administrator.email, password: administrator.password })

    assert.deepEqual(response.statusCode, 200)
  })
})
