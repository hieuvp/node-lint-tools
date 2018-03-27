const hapi = require('./hapi.runfile');

it('should match snapshot', () => {
  expect(hapi).toMatchSnapshot();
});
