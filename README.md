# Pokemon API

A simple API for retrieving Pokemon information.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/pokemon-api.git
   cd pokemon-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

The API will be available at `http://localhost:3000/api/`.

## API Routes

### Authentication

#### Register

- **URL:** `/api/auth/register`
- **Method:** POST
- **Description:** Register a new user.
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:** User object with token.

#### Login

- **URL:** `api/auth/login`
- **Method:** POST
- **Description:** Authenticate a user and receive a token.
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:** User object with token.

### Pokemon Routes

### Get All Pokemon

- **URL:** `/api/pokemon`
- **Method:** GET
- **Description:** Retrieves a list of all Pokemon. Features pagination.
- **Query Parameters:**
  - `page` (number, optional) - The page number to return. Default is 1.
  - `limit` (number, optional) - The number of Pokemon per page. Default is 20.
- **Response:**
  ```json
  {
    "data": {
      "pokemon": number,
      "currentPage": number,
      "totalPages": number,
      "totalPokemon": number,
    }
  }
  ```

### Get Pokemon by ID

- **URL:** `api/pokemon/:id`
- **Method:** GET
- **Description:** Retrieves a specific Pokemon by its ID.
- **Parameters:** `id` (number) - The Pokemon's ID.
- **Response:** Pokemon object.

### Get Pokemon by Name

- **URL:** `api/pokemon/name/:name`
- **Method:** GET
- **Description:** Retrieves a specific Pokemon by its name.
- **Parameters:** `name` (string) - The Pokemon's name.
- **Response:** Pokemon object.

### Get Pokemon by Type

- **URL:** `api/pokemon/type/:type`
- **Method:** GET
- **Description:** Retrieves all Pokemon of a specific type.
- **Parameters:** `type` (string) - The Pokemon type.
- **Response:** Array of Pokemon objects.

#### Add New Pokemon

- **URL:** `/pokemon`
- **Method:** POST
- **Description:** Adds a new Pokemon to the database.
- **Authentication:** Required
- **Body:**
  ```json
  {
    "name": "string",
    "type": "string",
    "abilities": ["string"],
    "stats": {
      "hp": "number",
      "attack": "number",
      "defense": "number",
      "speed": "number"
    }
  }
  ```
- **Response:** Newly created Pokemon object.

#### Update Pokemon

- **URL:** `/pokemon/:id`
- **Method:** PUT
- **Description:** Updates an existing Pokemon's information.
- **Authentication:** Required
- **Parameters:** `id` (number) - The Pokemon's ID.
- **Body:** Same as Add New Pokemon, with optional fields.
- **Response:** Updated Pokemon object.

#### Delete Pokemon

- **URL:** `/pokemon/:id`
- **Method:** DELETE
- **Description:** Deletes a Pokemon from the database.
- **Authentication:** Required
- **Parameters:** `id` (number) - The Pokemon's ID.
- **Response:** Success message.

## Error Handling

The API returns appropriate HTTP status codes and error messages for invalid requests or server errors.

## Authentication

All Pokemon routes require a valid JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## Data Source

This API uses [PokeAPI](https://pokeapi.co/) as its data source.

## License

This project is licensed under the MIT License.
