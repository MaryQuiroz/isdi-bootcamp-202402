

API_URL="http://localhost:9000/cats"

CAT_ID="66452aecbe85515958ff3135"

DATA='{
  "name": "Nuevo Nombre",
  "color": "Negro",
  "breed": "Siamés",
  "birthdate": "2021-02-06",
  "avatar": "https://example.com/avatar.jpg",
  "description": "Descripción actualizada"
}'

AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQzY2RkZDBiNjNhZjRmNTg1ZDA4ZDMiLCJpYXQiOjE3MTU4MDc5NTAsImV4cCI6MTcxNTgxNzk1MH0.5NmiEy9FIygY2JVraQLbS35YVZFNRgMoVMUQL5VBU_o"

curl -X PUT "$API_URL/$CAT_ID" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -d "$DATA"

echo "Cat Updated"