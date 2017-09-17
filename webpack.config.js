const { resolve } = require('path')
const GasPlugin = require('gas-webpack-plugin')

module.exports = {
  entry: {
    runTest: './src/runTest.js',
    getTestResults: './src/getTestResults.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'gas',
            ],
            plugins: ['transform-class-properties'],
          }
        }
      }
    ]
  },
  plugins: [
    new GasPlugin(),
  ],
}
