const assert = require('node:assert/strict')
const request = require('supertest')

const createApp = require('../app')
const db = require('../models')

assert.isTrue = (actual, message) => assert.strictEqual(actual, true, message)

const app = createApp()

suite('User', () => {
  const administrator = {
    isAdmin: true,
    firstName: 'admin',
    lastName: 'istrator',
    password: '12345678',
    email: 'admin@example.com',
    fileNumber: '1',
  }

  suiteSetup(async () => {
    await db.sequelize.sync({ force: true })
    await db.User.create(administrator)
  })

  suiteTeardown(async () => await db.sequelize.close())

  test('Cannot login with non-registered email', async () => {
    const nonRegisteredEmail = 'nonregistered@example.com'
    const response = await request(app)
      .post('/auth/login')
      .send({ email: nonRegisteredEmail, password: administrator.password })

    assert.deepEqual(response.statusCode, 401)
  })

  test('Cannot login with wrong password', async () => {
    const wrongPassword = '87654321'
    const response = await request(app)
      .post('/auth/login')
      .send({ email: administrator.email, password: wrongPassword })

    assert.deepEqual(response.statusCode, 401)
  })

  test('Cannot create new users if not an administrator', async () => {
    const response = await request(app).post('/users')

    assert.deepEqual(response.statusCode, 401)
  })

  test('Can create new users only if an administrator', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: administrator.email, password: administrator.password })

    assert.deepEqual(response.statusCode, 200)
  })

  test('The user with id 1 must be an administrator', async () => {
    const firstUser = await db.User.findByPk(1)

    assert.isTrue(firstUser.isRoot())
  })

  test('The root user I.e. the original administrator with id 1, AKA "superadministrator" cannot be deactivated', async () => {
    const root = await db.User.findByPk(1)
    root.deactivated_at = new Date()

    assert.deepEqual(root.deactivated_at, null)
  })

  test('The original administrator with id 1, cannot be demoted to a regular user', async () => {
    const root = await db.User.findByPk(1)
    root.isAdmin = false

    assert.isTrue(root.isAdministrator())
  })
})
