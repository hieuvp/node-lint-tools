const glob = require('glob');
const { lint, parseESLintArgs, parseJSONLintArgs } = require('./node.runfile');

// test it
// - using unit tests
// - using npm run lint

describe('lint', () => {

});

describe('parseESLintArgs', () => {

});

describe('parseJSONLintArgs', () => {

  it('should ', () => {
    const args = [
      // 'runfile.js',
      'packages/hapi-linter/src',
      'packages/node-linter/src',
      'packages/react-linter/src',
      'packages/react-native-linter/src'
    ];

    console.log(glob.sync('packages/node-linter/src/**/*.js'));
    // files is an array of filenames.
    // If the `no null` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    // args.forEach(dir => {
    //   console.log(`=========== ${dir} ==========`);
    //   fs.readdirSync(dir).forEach(file => {
    //     console.log(file);
    //   });
    //   console.log(`=====================`);
    // });

    console.log('parseJSONLintArgs =', parseJSONLintArgs(args));
  });

});
