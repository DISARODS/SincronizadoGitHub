const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'none',
    entry:
    {
        app: ["@babel/polyfill", './src/app/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/app.bundle.js'
    },
    devServer: {
        port: 5050
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            hash: true,
            template: './src/index.html',
            minify: {
                collapseWhitespace:
                    true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }

        }),
        new MiniCssExtractPlugin({
            filename: 'css/app.bundle.css'
        }),
    ]
};