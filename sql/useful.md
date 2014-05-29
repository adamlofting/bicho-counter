Who did what when
```sql
SELECT comments.submitted_on, people.user_id, 'comment' as action_type
  FROM comments, people
  WHERE comments.submitted_by = people.id
  AND comments.submitted_by > 0

UNION ALL

SELECT issues.submitted_on, people.user_id, 'issue' as action_type
  FROM issues, people
  WHERE issues.submitted_by = people.id
  AND issues.submitted_by > 0
```
