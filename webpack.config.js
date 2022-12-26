const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: './index.js',

    output: {
        filename: '[contenthash].js',
        path: path.join(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]',
    },

    devtool: 'eval',

    devServer: {
        port: 4200,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            scriptLoading: "blocking",
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            { from: "./app/assets", to: "./assets" },
          ],
        }),
    ],

    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    }
}