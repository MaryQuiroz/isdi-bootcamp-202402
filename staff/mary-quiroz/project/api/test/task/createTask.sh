curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU3NTllNzU4ZTc3ODVlYWQzOTBiMjciLCJpYXQiOjE3MTc2MzAwMTMsImV4cCI6MTcxNzY0MDAxM30.H41OUhZMPsL_qHGWqUkMsrTdQ9hHecyIkvKRkxbuT4U" \
-H "Content-Type: application/json" \
-d '{
  "title": "Vet Appointment",
  "description": "Take the cat to the vet for a checkup",
  "priority": "High",
  "completed": "true"
  "dueDate": "2024-08-01",
  "concurrency": "Once"
}' \
http://localhost:9000/cats/665759e758e7785ead390b27/tasks -v