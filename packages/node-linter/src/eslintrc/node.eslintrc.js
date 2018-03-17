const rules = require('./node.rules.eslintrc');

module.exports = {
  plugins: ['jest', 'node', 'prettier', 'security'],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
  ],
  rules
};
