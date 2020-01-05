const { exec } = require('child_process');
const config = require('../config/config.js');
const { checkDirectory, catchError, promisifyProcess, logger } = require('./functions.js');

const sourcePath = `./config/env/${config.ENV}`;
const destinationPath = './public';

checkDirectory(destinationPath);

const moveNginxFiles = exec(`cp ${sourcePath}/.htpasswd ${destinationPath}`, catchError);
promisifyProcess(moveNginxFiles)
  .then(() => logger.success('Nginx static files moved'))
  .catch((err) => {
    logger.error('An error occurred while files');
    logger.error(err);
  });
