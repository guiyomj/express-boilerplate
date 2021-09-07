const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_URL = "./frontend";

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: `${BASE_URL}/js/index.js`,
    output: {
        filename: "index.bundle.js", // bundle 될 파일 이름
        path: path.resolve(__dirname, "public"),
        clean: true,
        publicPath: "/public" //웹팩 미들웨어 장소
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${BASE_URL}/index.html`, // html webpack플러그인을 통해 html 파일도 함께 bundle
      }),
      new miniCssExtractPlugin({ filename: "css/style.css" })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                        ],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};