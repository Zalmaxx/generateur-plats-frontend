import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv(), new EnvironmentPlugin({API_URL: "http://no-var-env-find.fr"})]
};
