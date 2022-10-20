const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const queryValues = [`%${cohortName}`, limit];

pool.query(queryString, queryValues)
  .then(res => {
    console.log(res.rows);
    pool.end();
  })
  .catch(err => {
    console.log(err.stack);
  });