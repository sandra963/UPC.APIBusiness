require('dotenv').config();
const app = require('./server/app');
const port = process.env.PORT || 4001;
const logger = require('./server/logger');

app.listen(port , () => {
  logger.info(`Servidor Iniciado en puerto ${port}`)
});