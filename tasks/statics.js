const { exec } = require('child_process');
const { checkDirectory, catchError, promisifyProcess, logger } = require('./functions.js');

const sourcePath = './src/static';
const destinationPath = './public';

// check if the directory exist, create if doesn't
checkDirectory(destinationPath);

// Remove old files
const removeOldFiles = exec(`rm -fr ${destinationPath}/*`, catchError);
promisifyProcess(removeOldFiles).then(() => {
  // Move static files into dist directory
  const moveAssets = exec(`cp -R ${sourcePath}/assets ${destinationPath}`, catchError);
  promisifyProcess(moveAssets)
    .then(() => logger.success('Assets moved'))
    .catch((err) => logger.error(`An error occurred : ${err}`));

  // Move static files into dist directory
  const moveFavIcon = exec(`cp -R ${sourcePath}/favicon.ico ${destinationPath}`, catchError);
  promisifyProcess(moveFavIcon)
    .then(() => logger.success('favicon.ico moved'))
    .catch((err) => logger.error(`An error occurred : ${err}`));

  // Move static files into dist directory
  const moveSiteMap = exec(`cp -R ${sourcePath}/sitemap.xml ${destinationPath}`, catchError);
  promisifyProcess(moveSiteMap)
    .then(() => logger.success('sitemap.xml moved'))
    .catch((err) => logger.error(`An error occurred : ${err}`));

  // Move static files into dist directory
  const moveRobots = exec(`cp -R ${sourcePath}/robots.txt ${destinationPath}`, catchError);
  promisifyProcess(moveRobots)
    .then(() => logger.success('robots.txt moved'))
    .catch((err) => logger.error(`An error occurred : ${err}`));
});
