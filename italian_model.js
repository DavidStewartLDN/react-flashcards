require('dotenv').config()
const pg = require('pg');
const pool = pg.connect(process.env.DATABASE_URL);

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

const getItalian = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM italian ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const getItalianWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM italian WHERE id=$1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createItalianWord = (body) => {
  return new Promise(function(resolve, reject) {
    const { english, native, latin_script } = body
    pool.query('INSERT INTO italian (english, native, latin_script) VALUES ($1, $2, $3) RETURNING *', [english, native, latin_script], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new word has been added: ${english}`)
    })
  })
}
const deleteItalianWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM italian WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Word deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getItalian,
  getItalianWord,
  createItalianWord,
  deleteItalianWord,
}