const path = require('path')
const Dotenv = require('dotenv-webpack')
const GasPlugin = require('gas-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    runTest: './src/runTest.ts',
    getTestResults: './src/getTestResults.ts',
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
  plugins: [new Dotenv(), new GasPlugin()],
}
