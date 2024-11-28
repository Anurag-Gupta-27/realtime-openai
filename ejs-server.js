import pageRoutes from './routes/pageRoutes.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));

app.use('/', pageRoutes);

// Start the EJS server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`EJS server is running on http://localhost:${PORT}`);
}); 