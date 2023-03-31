const username = process.env.DEV_PD_USERNAME || null
const password = process.env.DEV_PD_PASSWORD || null
const host = process.env.DEV_PD_HOSTNAME || 'localhost'
const dialect = 'postgres'
const database = process.env.DEV_PD_NAME || 'pd_dev'
const logging = process.env.DEV_PD_LOGGING || false

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
    database: process.env.CI_PD_NAME,
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
