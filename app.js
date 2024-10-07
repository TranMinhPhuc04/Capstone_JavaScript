// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8888;

//middlewares
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,'src', 'assets')));

// Route chính
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'views', 'index.html'));
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
