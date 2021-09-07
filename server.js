const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const port = 3000

//webpack 미들웨어 사용
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static("assets"));
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, './frontend')));

app.use('/', indexRouter);

app.use(webpackDevMiddleware(compiler))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(port, () => {
    console.log(`Server start at localhost:${port}`);
});

module.exports = app;
