const node = require('./node.eslintrc');

it('should match snapshot', () => {
  expect(node).toMatchSnapshot();
});
