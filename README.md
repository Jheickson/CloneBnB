# CloneBnB

## Development setup

1. Create a `.env` file inside `back-end` with the following variables:

   ```
   PORT=3001
   MONGO_URL=mongodb://localhost:27017/hashbnb
   ```

2. Start the API server from the repository root:

   ```bash
   npm run start
   ```

3. In another terminal start the React app:

   ```bash
   npm run dev --prefix front-end
   ```