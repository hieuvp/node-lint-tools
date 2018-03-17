const node = require('@hieu.van/node-linter/src/eslintrc');
const rules = require('./hapi.rules.eslintrc');

module.exports = {
  ...node,
  plugins: [...node.plugins, 'hapi'],
  rules: {
    ...node.rules,
    ...rules
  }
};
