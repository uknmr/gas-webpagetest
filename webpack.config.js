const path = require('path')
const Dotenv = require('dotenv-webpack')
const GasPlugin = require('gas-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const SCRIPT_FILE_PATH = path.join(__dirname, 'script.txt')
const WEBPAGETEST_OPTIONS_SCRIPT_CODE = fs.existsSync(SCRIPT_FILE_PATH)
  ? fs.readFileSync(SCRIPT_FILE_PATH, 'utf-8')
  : undefined

module.exports = {
  mode: 'none',
  entry: {
    'gas-webpagetest': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: false,
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.WEBPAGETEST_OPTIONS_SCRIPT_CODE': JSON.stringify(
        WEBPAGETEST_OPTIONS_SCRIPT_CODE
      ),
    }),
    new GasPlugin(),
  ],
}
