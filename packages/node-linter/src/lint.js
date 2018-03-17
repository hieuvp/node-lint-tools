const { exec } = require('child_process');

module.exports = function lint(...args) {
  exec(`npx eslint --fix ${args.join(' ')}`, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};
