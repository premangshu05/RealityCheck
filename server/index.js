const express = require('express');
const cors = require('cors');
const roundRoute = require('./routes/round');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/round', roundRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
