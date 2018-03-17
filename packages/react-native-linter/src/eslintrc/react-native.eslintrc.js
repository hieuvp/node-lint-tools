const react = require('@hieu.van/react-linter/src/eslintrc');
const rules = require('./react-native.eslintrc.rules');

module.exports = {
  ...react,
  plugins: [...react.plugins, 'react-native'],
  extends: [...react.extends, 'plugin:react-native/all'],
  rules: {
    ...react.rules,
    ...rules
  }
};
