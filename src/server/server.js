const express = require('express');
const api = require('./routes/api');

const app = express();

if ((!process.env.DB_USER || !process.env.DB_PWD) && (!process.env.npm_package_config_db_user || !process.env.npm_package_config_db_pwd)) {
  console.error('Missing DB credentials.  Please provide and restart server');
  process.exit(1);
}

app.use('/api', api);

module.exports = app;