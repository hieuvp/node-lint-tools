const rules = require('./node.rules.eslintrc');

module.exports = {
  plugins: ['jest', 'jsdoc', 'node', 'optimize-regex', 'prettier', 'promise', 'security'],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended'
  ],
  rules
};
