const node = require('./node.runfile');

describe('node.runfile', () => {
  it('should match snapshot', () => {
    expect(node).toMatchSnapshot();
  });
});
