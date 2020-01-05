module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-url': [
      {
        url: 'inline',
        filter: '**/src/**/*.svg',
      },
    ],
  },
};
