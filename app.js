// pourrait être utilisé Knex.js ; un SQL query builder pour PostgreSQL, MySQL, SQLite3, Better-SQLite3, Amazon Redshift et d'autres
// tuto Knex https://youtu.be/cr3pX6fSUpc?t=1011 

const sqlite = require('sqlite3')

const bdname = 'main.db'

// ouverture BDD
let db = new sqlite.Database(bdname, err => {
     if (err) throw err
     console.log('db started');
})

db.serialize(() => {  // serialize évite le parallèlisme par défaut de sqlite. Il est enlevable ; toutes les requêtes seront alors exécutées sans attendre la fin de la précédente

     // db.run(`CREATE TABLE test(name VARCHAR(255))`)

     // db.run('INSERT INTO test(name) VALUES(?)', ['José'])
     db.run('UPDATE test SET name = "Mat" WHERE name = "José"')

     // db.get('SELECT * FROM test', (err, data) => {
     // db.all('SELECT * FROM test', (err, data) => {
     db.each('SELECT * FROM test', (err, data) => {
          if (err) throw err
          console.log(data.name);
     })

})


db.close(err => {
     if (err) throw err
     console.log('db closed');
})
