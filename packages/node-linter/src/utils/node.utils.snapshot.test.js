const node = require('./node.utils');

it('should match snapshot', () => {
  expect(node).toMatchSnapshot();
});
