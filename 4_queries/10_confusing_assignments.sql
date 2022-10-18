SELECT ass.id, ass.name, ass.day, ass.chapter, COUNT(*) AS total_requests FROM assistance_requests
 JOIN assignments ass ON assignment_id=ass.id
 GROUP BY ass.id
 ORDER BY total_requests DESC;