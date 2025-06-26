# CloneBnB

## Development setup

1. Create a `.env` file inside `back-end` with the following variables:

   ```
   PORT=3001
   MONGO_URL=mongodb://localhost:27017/hashbnb
   # URL where the front-end will be served during development
   CLIENT_URL=http://localhost:5173
   ```

2. Start the API server from the repository root:

   ```bash
   npm run start
   ```

3. In another terminal start the React app:

   ```bash
   npm run dev --prefix front-end
   ```

Make sure `CLIENT_URL` matches the address used by the front-end. If you
run the API on another port, update the value used in the React app by
setting `VITE_API_URL` before starting Vite.