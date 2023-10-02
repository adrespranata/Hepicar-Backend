require('dotenv').config();

const express = require('express');
const cors = require('cors');

const servicesRoutes = require('./routes/servicesRoute')
const logMiddleware = require('./middleware/logMiddleware')

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(logMiddleware);
app.use(express.json());

// Routes
app.use('/services', servicesRoutes);

app.listen(port, () => {
  console.log(`Server berhasil running di port ${port}`);
});

module.exports = app;