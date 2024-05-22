API_URL="http://localhost:9000/users/auth"

DATA='{
  "email": "dachirituu@gmail.com",
  "password": "123qwe123"
}'

curl -X POST "$API_URL" \
     -H "Content-Type: application/json" \
     -d "$DATA" \
     -v

echo "User Authenticated!."
