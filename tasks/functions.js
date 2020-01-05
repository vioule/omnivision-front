/* eslint-disable max-len, no-console, quotes */
const fs = require('fs');

const colors = require('./constants.js');

const logger = {
  error: (message) => console.log(colors.RED_COLOR, '✘', colors.WHITE_COLOR, message),
  success: (message) => console.log(colors.GREEN_COLOR, '✔', colors.WHITE_COLOR, message),
  log: (message) => console.log(message),
};

const checkDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
};

const catchError = (error) => {
  if (error !== null) {
    console.log('exec error:', error); // eslint-disable-line
    throw error;
  }
};

const promisifyProcess = (child) => new Promise((resolve, reject) => {
  child.addListener('error', reject);
  child.addListener('exit', resolve);
});


module.exports = {
  checkDirectory,
  catchError,
  logger,
  promisifyProcess,
};
