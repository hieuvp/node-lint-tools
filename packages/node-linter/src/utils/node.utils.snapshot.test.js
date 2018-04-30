const node = require('./node.utils');

describe('node.utils', () => {
  it('should match snapshot', () => {
    expect(node).toMatchSnapshot();
  });
});
