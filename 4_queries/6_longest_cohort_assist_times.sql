SELECT x.cohort AS name, MAX(x.average) AS average_assistance_time FROM (SELECT cohorts.name AS cohort, AVG(completed_at-started_at) AS average FROM assistance_requests
 JOIN students ON student_id=students.id
 JOIN cohorts ON cohort_id=cohorts.id
 GROUP BY cohorts.name) x
 GROUP BY x.cohort
 ORDER BY average_assistance_time DESC LIMIT 1;