const rules = require('./node.rules.eslintrc');

module.exports = {
  plugins: [
    'eslint-comments',
    'jest',
    'jsdoc',
    'node',
    'optimize-regex',
    'prettier',
    'promise',
    'security'
  ],
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended'
  ],
  rules
};
