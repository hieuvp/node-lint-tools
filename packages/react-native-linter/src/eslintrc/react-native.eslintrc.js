const { eslintrc: react } = require('@hieu.van/react-linter');
const rules = require('./react-native.rules.eslintrc');

module.exports = {
  ...react,
  plugins: [...react.plugins, 'react-native'],
  extends: [...react.extends, 'plugin:react-native/all'],
  rules: {
    ...react.rules,
    ...rules
  }
};
