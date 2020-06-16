const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'flashcards',
  password: 'root',
  port: 5432,
});

const getRussian = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM russian ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const getRussianWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM russian WHERE id=$1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createRussianWord = (body) => {
  return new Promise(function(resolve, reject) {
    const { english, native, latin_script } = body
    pool.query('INSERT INTO russian (english, native, latin_script) VALUES ($1, $2, $3) RETURNING *', [english, native, latin_script], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new word has been added: ${english}`)
    })
  })
}
const deleteRussianWord = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM russian WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Word deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRussian,
  getRussianWord,
  createRussianWord,
  deleteRussianWord,
}