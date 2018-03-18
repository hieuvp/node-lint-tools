const { options, run } = require('runjs');

module.exports = function lint(...args) {
  const { fix } = options(this);
};
