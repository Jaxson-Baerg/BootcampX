const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort FROM assistance_requests
JOIN teachers ON teacher_id=teachers.id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;
const cohortName = process.argv[2] || 'JUL02';
const queryValues = [`%${cohortName}%`];

pool.query(queryString, queryValues)
  .then(res => {
    console.log(res.rows);
    pool.end();
  })
  .catch(err => {
    console.log(err.stack);
  });