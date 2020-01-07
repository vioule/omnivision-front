/* eslint-env node */
const ARGS_REG = /^--.*/;
const ARGS_OBJ = {};

process.argv.forEach((arg) => {
  if (ARGS_REG.test(arg)) {
    const splitted = arg.split('=');
    const param = splitted[0].startsWith('--')
      ? splitted[0].substring(2)
      : splitted[0];
    ARGS_OBJ[param] = splitted[1] || null;
  }
});

const ENV = ARGS_OBJ.env || process.env.npm_config_env || 'prod';
const API = ARGS_OBJ.api || process.env.npm_config_api || ENV;
const WITH_HASH = ['prod', 'staging', 'dev'].includes(ENV)
  ? 'production'
  : 'development';
const NODE_ENV = ['prod'].includes(ENV) ? 'production' : 'development';
const BABEL_ENV = NODE_ENV === 'production' ? 'production' : 'development';
const DEV_TOOLS =
  NODE_ENV === 'production'
    ? 'cheap-source-map'
    : 'cheap-module-eval-source-map';

module.exports = {
  API,
  BABEL_ENV,
  DEV_TOOLS,
  ENV,
  NODE_ENV,
  WITH_HASH,
};
