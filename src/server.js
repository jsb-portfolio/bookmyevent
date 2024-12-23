const express = require('express');
const next = require('next');

// Import dotenv if you are using environment variables from a .env file
// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({
//   path: path.resolve(__dirname, '../.env'),
// });

/**
 * @type {import('next').NextServer}
 */
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
app.prepare().then(() => {
  const server = express();

  // Example: Custom middleware
  server.use(express.json());

  // // Custom route example
  // server.get('/api/custom', (req, res) => {
  //   res.json({ message: 'Hello from custom API route!' });
  // });

  // Handling Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready next+express on http://localhost:${port}`);
  });
});
