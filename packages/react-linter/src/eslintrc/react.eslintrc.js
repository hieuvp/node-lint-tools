const { eslintrc: node } = require('@hieu.van/node-linter');
const rules = require('./react.rules.eslintrc');

module.exports = {
  ...node,
  plugins: [...node.plugins, 'import', 'jsx-a11y', 'react'],
  extends: [
    ...node.extends,
    'airbnb',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier/react'
  ],
  rules: {
    ...node.rules,
    ...rules
  }
};
