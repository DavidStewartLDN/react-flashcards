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

const getMandarin = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM mandarin ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const getMandarinWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM mandarin WHERE id=$1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createMandarinWord = (body) => {
  return new Promise(function(resolve, reject) {
    const { english, native, latin_script } = body
    pool.query('INSERT INTO mandarin (english, native, latin_script) VALUES ($1, $2, $3) RETURNING *', [english, native, latin_script], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new word has been added: ${english}`)
    })
  })
}
const deleteMandarinWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM mandarin WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Word deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMandarin,
  getMandarinWord,
  createMandarinWord,
  deleteMandarinWord,
}