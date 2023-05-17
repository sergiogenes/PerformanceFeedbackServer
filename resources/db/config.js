const username = process.env.DEV_PD_USERNAME
const password = process.env.DEV_PD_PASSWORD
const host = process.env.DEV_PD_HOSTNAME
const dialect = 'postgres'
const database = process.env.DEV_PD_NAME
const logging = process.env.DEV_PD_LOGGING

const config = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    logging,
  },
  test: {
    username: process.env.CI_PD_USERNAME,
    password: process.env.CI_PD_PASSWORD,
    database: process.env.CI_PD_NAME || 'pd_test',
    host,
    dialect,
    logging,
  },
  production: {
    username: process.env.PROD_PD_USERNAME,
    password: process.env.PROD_PD_PASSWORD,
    database: process.env.PROD_PD_NAME,
    host: process.env.PROD_PD_HOSTNAME,
    port: process.env.PROD_PD_PORT,
    dialect,
    logging,
  },
}

module.exports = config
