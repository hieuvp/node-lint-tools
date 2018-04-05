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
  rules,
  overrides: [
    {
      files: ['runfile.js', '*.test.js', '*.spec.js'],
      rules: {
        'node/no-extraneous-require': 'off',
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
};
