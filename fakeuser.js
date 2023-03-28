const User = require('./models/User')

User.truncate({ cascade: true, restartIdentity: true })

const fakeDataUsers = [
  {
    firstName: 'Marco',
    lastName: 'Polo',
    password: '12345678',
    email: 'marco@mail.com',
    fileNumber: 'AR-12345',
    shift: 'morning',
    isAdmin: true,
  },
  {
    firstName: 'Anacleto',
    lastName: 'Perez',
    password: '12345678',
    email: 'anacleto@mail.com',
    fileNumber: 'AR-123456',
    shift: 'morning',
  },
]

fakeDataUsers.map(user => {
  User.create(user)
})
