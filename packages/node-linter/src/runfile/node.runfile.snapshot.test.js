const node = require('./node.runfile');

it('should match snapshot', () => {
  expect(node).toMatchSnapshot();
});
