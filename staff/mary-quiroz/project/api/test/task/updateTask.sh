API_URL="http://localhost:9000/tasks"

TASK_ID="664544435971637901e18203"

AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQzY2RkZDBiNjNhZjRmNTg1ZDA4ZDMiLCJpYXQiOjE3MTU4MDc5NTAsImV4cCI6MTcxNTgxNzk1MH0.5NmiEy9FIygY2JVraQLbS35YVZFNRgMoVMUQL5VBU_o"

DATA='{
  "title": "no tio",
  "description": "Updated Description 1",
  "priority": "Medium",
  "dueDate": "2024-01-01"
}'

curl -X PATCH "$API_URL/$TASK_ID" \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -H "Content-Type: application/json" \
     -d "$DATA" \
     -v

echo "Updated Task."
