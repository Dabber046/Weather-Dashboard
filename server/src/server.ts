import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// Import routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from React's dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// ✅ Use backend routes
app.use('/api', routes);

// ✅ Fallback to index.html for React routing (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
