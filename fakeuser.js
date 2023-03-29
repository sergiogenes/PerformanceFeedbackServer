const { User } = require('./models')

User.truncate({ cascade: true, restartIdentity: true })

const fakeDataUsers = [
  {
    firstName: 'Marco',
    lastName: 'Polo',
    email: 'marco@mail.com',
    fileNumber: 'AR-123',
    shift: 'morning',
    isAdmin: true,
  },
  {
    firstName: 'Anacleto',
    lastName: 'Perez',
    email: 'anacleto@mail.com',
    fileNumber: 'AR-123456',
    shift: 'morning',
  },
]

fakeDataUsers.map(user => {
  User.create(user)
})
