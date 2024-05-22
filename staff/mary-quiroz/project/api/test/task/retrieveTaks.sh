API_URL="http://localhost:9000/tasks/cat"

CAT_ID="66454f1d064dd213e80ef7dc"

AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQzY2RkZDBiNjNhZjRmNTg1ZDA4ZDMiLCJpYXQiOjE3MTU4MTgyNDksImV4cCI6MTcxNTgyODI0OX0.hWtjvVarSCrAKLp7vHQ_uhDzb82axrS-nn9gjkyAVl0"

curl -H "Authorization: Bearer $AUTH_TOKEN" "$API_URL/$CAT_ID" -v

echo "Retrieved Tasks."
