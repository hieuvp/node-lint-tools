// eslint-disable-next-line promise/avoid-new
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  sleep
};
