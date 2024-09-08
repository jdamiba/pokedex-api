#!/bin/bash

# URL of your API
API_URL="http://localhost:3000/api"

# Admin credentials
USERNAME="testuser2"
PASSWORD="testpassword2"

# Login and get the token
echo "Logging in..."
TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" $API_URL/auth/login | jq -r '.token')

if [ -z "$TOKEN" ]; then
    echo "Login failed. Please check your credentials."
    exit 1
fi

echo "Login successful. Token acquired."

# Function to upload a single Pokémon
upload_pokemon() {
    local pokemon="$1"
    curl -s -X POST \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer $TOKEN" \
         -d "$pokemon" \
         $API_URL/pokemon > /dev/null
    echo -n "."
}

# Read the JSON file and upload each Pokémon
echo "Uploading Pokémon..."
jq -c '.[]' pokedex.json | while read pokemon; do
    upload_pokemon "$pokemon"
done

echo -e "\nUpload complete!"