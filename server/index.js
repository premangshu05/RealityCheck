const express = require('express');
const cors = require('cors');
const path = require('path');
const roundRoute = require('./routes/round');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/round', roundRoute);

const distPath = path.resolve(__dirname, '../client/dist');
const indexPath = path.resolve(distPath, 'index.html');

console.log('Serving static files from:', distPath);
console.log('Index file path:', indexPath);

// Serve Static Files from React build
app.use(express.static(distPath));

// Serve Static Files from React build
app.use(express.static(distPath));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
