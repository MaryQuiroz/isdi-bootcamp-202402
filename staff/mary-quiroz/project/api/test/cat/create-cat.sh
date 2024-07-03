curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg1N2ZlMWY1MmMxNmMzODEyOGMxODQiLCJpYXQiOjE3MjAwMjUwODQsImV4cCI6MTc1MTU2MTA4NH0.O7wP2oTdabgacYTuZRAVQO19DKts6xSiQa9cL6-ohvU" \
-H "Content-Type: application/json" \
-d '{"name": "chimuelito", "color": "blue", "breed": "criole", "birthdate": "2021-05-21", "avatar": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXc3NGVocGkxcmxrem45Z2lwZDA4bXlveW01Ym0xY2J5bjI0eGh4eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tAVCppet3HpPa/giphy.gif", "description": "this is my third cat"}' \
http://localhost:9000/cats -v