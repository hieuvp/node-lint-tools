const node = require('./node.eslintrc');

describe('node.eslintrc', () => {
  it('should match snapshot', () => {
    expect(node).toMatchSnapshot();
  });
});
