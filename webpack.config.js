const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  mode: 'development',
  devServer: {
    port: 8080,
    open: true,
    hot: false,
    liveReload: true,
  },
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, './index.html'),
        filename: 'index.html', 
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/templates", to: "./templates" },
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

}