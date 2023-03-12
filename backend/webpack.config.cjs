const path = require('path');
const webpack = require('webpack');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.ENVIRONMENT': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('3080'),
  'process.env.DATABASE': JSON.stringify(
    'mongodb+srv://theeleven:<password>@face.cly0nzp.mongodb.net/?retryWrites=true&w=majority'
  ),
  'process.env.DATABASE_PASSWORD': JSON.stringify('GgLYZ3uEv70JkuvG'),
  'process.env.JWT_SECRET': JSON.stringify('HUNGJWT123'),
  'process.env.JWT_EXPIRES_IN': JSON.stringify('90d'),
};

if (environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('development'),
    'process.env.PORT': JSON.stringify('3080'),
    'process.env.DATABASE': JSON.stringify(
      'mongodb+srv://theeleven:<password>@face.cly0nzp.mongodb.net/?retryWrites=true&w=majority'
    ),
    'process.env.DATABASE_PASSWORD': JSON.stringify('GgLYZ3uEv70JkuvG'),
    'process.env.JWT_SECRET': JSON.stringify('HUNGJWT123'),
    'process.env.JWT_EXPIRES_IN': JSON.stringify('90d'),
  };
} else if (environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('development'),
    'process.env.PORT': JSON.stringify('80'),
    'process.env.DATABASE': JSON.stringify(
      'mongodb+srv://theeleven:<password>@face.cly0nzp.mongodb.net/?retryWrites=true&w=majority'
    ),
    'process.env.DATABASE_PASSWORD': JSON.stringify('GgLYZ3uEv70JkuvG'),
    'process.env.JWT_SECRET': JSON.stringify('HUNGJWT123'),
    'process.env.JWT_EXPIRES_IN': JSON.stringify('90d'),
  };
}

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.cjs',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'ignore-loader',
      },
    ],
  },
  target: 'node',
  plugins: [new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)],
};
