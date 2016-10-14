require('ts-node/register');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack');

const ROOT_DIR = path.normalize(__dirname);
const PORT = process.env.PORT || 8000;
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function logErrors(err, req, res, next) {
  if (err) {
    console.error(err.stack);
  }
  next(err);
}
app.use(logErrors);

if (process.env.NODE_ENV !== 'production') {
  const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-only',
  }));

  const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
  app.use(hotMiddleware(compiler));
}

app.use('/api', require('./src/server/users.ts').default);

app.use(express.static(ROOT_DIR));

// otherwise return index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.use((err, req, res, next) => { // eslint-disable-line
  if (err) {
    console.log(err);
    res.status(500).send('bad code path');
  }
});

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:%s', PORT);
});
