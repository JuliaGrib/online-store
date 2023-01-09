const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: './index.ts',

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
        new ESlintPlugin({ extensions: 'ts' }),
    ],

    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
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
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
}