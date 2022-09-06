const Pool = require('pg').Pool

const pool = new Pool({
    user: 'shannonbrooks',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'fullstack'
})

module.exports = pool