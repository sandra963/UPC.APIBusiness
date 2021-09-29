const express = require('express');
const cors = require('cors');
const routes = require('../routes/index.routes');
const app = express();
      app.use(cors())
         .use(express.json())
         .use('/api-matricula', routes)
         
module.exports = app;