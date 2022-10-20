const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);

pool.query(`
  SELECT students.id, students.name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohort_id=cohorts.id
  WHERE cohorts.name LIKE '%${args[0]}%'
  LIMIT ${args[1] || 5};
`)
  .then(res => {
    console.log(res.rows);
    pool.end();
  })
  .catch(err => {
    console.log(err.stack);
  });