const config = {
  BACKEND_URL: '',
  environment: 'prod',
};

if (typeof window !== 'undefined') {
  Object.keys(config).forEach(key => { window[key] = config[key]; });
}

module.exports = config;
