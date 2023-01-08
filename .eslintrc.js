module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  env: {
    browser: true,
  },
  ignorePatterns: ['node_modules'],
  rules: {
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'import/extensions': ['error', 'always'],
  },
};
