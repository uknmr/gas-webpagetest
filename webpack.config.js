const path = require('path')
const Dotenv = require('dotenv-webpack')
const GasPlugin = require('gas-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const dotenv = require('dotenv')
const getWebPagetestCode = () => {
  const result = dotenv.config()
  if (result.error) {
    throw result.error
  }
  const WEBPAGETEST_OPTIONS_SCRIPT_PATH = result.parsed.WEBPAGETEST_OPTIONS_SCRIPT_PATH
  if (!WEBPAGETEST_OPTIONS_SCRIPT_PATH) {
    return
  }
  const SCRIPT_FILE_PATH = path.resolve(__dirname, WEBPAGETEST_OPTIONS_SCRIPT_PATH)
  console.log(SCRIPT_FILE_PATH)
  if (!fs.existsSync(SCRIPT_FILE_PATH)) {
    return
  }
  return fs.readFileSync(SCRIPT_FILE_PATH, 'utf-8')
}

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
      'process.env.WEBPAGETEST_OPTIONS_SCRIPT_CODE': JSON.stringify(getWebPagetestCode()),
    }),
    new GasPlugin(),
  ],
}
