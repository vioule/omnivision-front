const config = {
  BACKEND_URL: 'http://localhost:5050',
  environment: 'localhost',
};

if (typeof window !== 'undefined') {
  Object.keys(config).forEach(key => { window[key] = config[key]; });
}

module.exports = config;
