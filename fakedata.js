const bcrypt = require('bcrypt')
const {
  User,
  Team,
  Review,
  Position,
  Office,
  Indicator,
  Country,
  Category,
} = require('./models')

const date = new Date()
const salt = bcrypt.genSaltSync(9)

async function seed() {
  try {
    await Country.bulkCreate([
      { name: 'Argentina', ISO: 'AR' },
      { name: 'Brazil', ISO: 'BR' },
      { name: 'Chile', ISO: 'CL' },
      { name: 'Colombia', ISO: 'CO' },
      { name: 'Ecuador', ISO: 'EC' },
      { name: 'United States', ISO: 'US' },
      { name: 'Mexico', ISO: 'MX' },
      { name: 'Paraguay', ISO: 'PY' },
      { name: 'Peru', ISO: 'PE' },
      { name: 'Uruguay', ISO: 'UY' },
    ])

    await Position.bulkCreate([
      { name: 'Gerente General' },
      { name: 'Gerente Regional' },
      { name: 'Country Manager' },
      { name: 'Gerente' },
      { name: 'Jefatura Regional' },
      { name: 'Jefatura' },
      { name: 'Coordinador Regional' },
      { name: 'Coordinador' },
      { name: 'Operador' },
    ])

    await Office.bulkCreate([
      { name: 'Amenabar', countryId: 1 },
      { name: 'Elia', countryId: 1 },
      { name: 'São Paulo', countryId: 2 },
      { name: 'Santiago de Chile', countryId: 3 },
      { name: 'Bogotá', countryId: 4 },
      { name: 'Quito', countryId: 5 },
      { name: 'Maimi', countryId: 6 },
      { name: 'Ciudad de México', countryId: 7 },
      { name: 'Asunción', countryId: 8 },
      { name: 'Lima', countryId: 9 },
      { name: 'Montevideo', countryId: 10 },
    ])

    await Team.bulkCreate([
      { name: 'Comercial' },
      { name: 'Sistemas' },
      { name: 'Recursos Humanos' },
    ])

    await Category.bulkCreate([
      {
        name: 'Comercial-Junior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
      {
        name: 'Comercial-Semi Senior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
      {
        name: 'Comercial-Senior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
      {
        name: 'Sistemas-Junior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
      {
        name: 'Sistemas-Semi Senior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
      {
        name: 'Sistemas-Senior',
        competence:
          'Esta es el campo donde van las competencias de esta categoría.',
        function: 'La función de esta categoría es funcionar.',
      },
    ])

    await Indicator.bulkCreate([
      { description: 'Recortes', goal: 450, categoryId: 1 },
      { description: 'Busquedas', goal: 1000, categoryId: 1 },
      { description: 'Publicaciones', goal: 50, categoryId: 1 },
      { description: 'Recortes', goal: 500, categoryId: 2 },
      { description: 'Busquedas', goal: 1100, categoryId: 2 },
      { description: 'Publicaciones', goal: 60, categoryId: 2 },
      { description: 'Recortes', goal: 550, categoryId: 3 },
      { description: 'Busquedas', goal: 1200, categoryId: 3 },
      { description: 'Publicaciones', goal: 70, categoryId: 3 },
    ])

    await User.bulkCreate([
      {
        isAdmin: true,
        firstName: 'admin',
        lastName: 'admin',
        password: bcrypt.hashSync('12345678', salt),
        salt,
        email: 'admin@example.com',
        fileNumber: 'AR1',
        image: 'https://api.multiavatar.com/AR1.svg',
        positionId: 1,
      },
      {
        isAdmin: false,
        firstName: 'Alonso',
        lastName: 'Quijano',
        password: bcrypt.hashSync('12345678', salt),
        salt,
        email: 'donquijote@example.com',
        fileNumber: 'AR2',
        image: 'https://api.multiavatar.com/AR2.svg',
        shift: 'morning',
        positionId: 2,
        officeId: 1,
        categoryId: 2,
        teamId: 1,
      },
      {
        isAdmin: false,
        firstName: 'Sancho',
        lastName: 'Panza',
        password: bcrypt.hashSync('12345678', salt),
        salt,
        email: 'spanza@example.com',
        fileNumber: 'AR3',
        image: 'https://api.multiavatar.com/AR3.svg',
        shift: 'morning',
        positionId: 3,
        officeId: 1,
        teamId: 1,
        categoryId: 3,
        leaderId: 2,
      },
    ])

    await Review.bulkCreate([
      {
        idIndicator: 1,
        indicator: 'Indicador 1',
        goal: 45,
        data: 40,
        result: -5,
        review: 'Faltaron 5, hay que mejorar eficiencia.',
        date,
        evaluatedId: 2,
        evaluatorId: 1,
        period: '2022-03',
      },
      {
        idIndicator: 2,
        indicator: 'Indicador 2',
        goal: 60,
        data: 70,
        result: 10,
        review: 'Vamos por buen camino.',
        evaluatedId: 3,
        evaluatorId: 2,
        date,
        period: '2022-03',
      },
    ])
  } catch (e) {
    console.log(e)
  }
}

seed()
