

API_URL="http://localhost:9000/tasks"

CAT_ID="664543f907ac4dda03d842a4"

DATA='{
  "title": "Task 1",
  "description": "Description 1",
  "priority": "High",
  "dueDate": "2023-12-31"
}'

AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQzY2RkZDBiNjNhZjRmNTg1ZDA4ZDMiLCJpYXQiOjE3MTU4MDc5NTAsImV4cCI6MTcxNTgxNzk1MH0.5NmiEy9FIygY2JVraQLbS35YVZFNRgMoVMUQL5VBU_o"

curl -X POST "$API_URL/$CAT_ID" \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -H "Content-Type: application/json" \
     -d "$DATA" \
     -v

echo "Created Task."
