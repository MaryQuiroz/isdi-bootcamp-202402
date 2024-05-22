#!/bin/bash

API_URL="http://localhost:9000/cats"

CAT_ID="66452aecbe85515958ff3135"

AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQzY2RkZDBiNjNhZjRmNTg1ZDA4ZDMiLCJpYXQiOjE3MTU4MDc5NTAsImV4cCI6MTcxNTgxNzk1MH0.5NmiEy9FIygY2JVraQLbS35YVZFNRgMoVMUQL5VBU_o"

curl -X DELETE "$API_URL/$CAT_ID" \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -v

echo "Cat Deleted!"
