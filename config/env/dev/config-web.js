const config = {
  BACKEND_URL: '',
  environment: 'dev',
};

if (typeof window !== 'undefined') {
  Object.keys(config).forEach(key => { window[key] = config[key]; });
}

module.exports = config;
