const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const BASE_URL = './frontend'

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: `${BASE_URL}/js/index.js`,
    output: {
        filename: 'index.bundle.js', // bundle 될 파일 이름
        path: path.resolve(__dirname, 'public'),
        clean: true,
        publicPath: '/public/' //웹팩 미들웨어 장소
    },
    devServer: {
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${BASE_URL}/index.html`, // html webpack플러그인을 통해 html 파일도 함께 bundle
        showErrors: true, // 에러 발생시 메세지가 브라우저 화면에 노출
      }),
      new miniCssExtractPlugin({ filename: 'css/style.css' }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        ['@babel/preset-env'],
                    ],
                  },
              },
          },
          {
            test: /\.html$/,
            use: 'html-loader'
          },
          {
              test: /\.(sa|sc|c)ss$/,
              use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          },
          {
              test: /\.(png|svg|jpg|jpeg|gif)$/,
              type: 'asset/resource'
          },
        ],
    },
}
