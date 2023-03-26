const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/pages/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js',
        clean: true,
        publicPath: ""
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        port: 8080,
        compress: true,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                  loader:"css-loader",
                  options: {importLoaders: 1}
              },
              'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ]
};
