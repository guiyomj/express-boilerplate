const express = require('express')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const app = express()
const port = 3000

//webpack 미들웨어 사용
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}))

app.listen(port, () => {
    console.log(`Server start at localhost:${port}`)
})

module.exports = app