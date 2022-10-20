const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort FROM assistance_requests
JOIN teachers ON teacher_id=teachers.id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE '%${args[0] || 'JUL02'}%'
ORDER BY teacher;
`)
  .then(res => {
    console.log(res.rows);
    pool.end();
  })
  .catch(err => {
    console.log(err.stack);
  });