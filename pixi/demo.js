const PageExperienceCli = require('./dist/Cli.js');
(async () => {
  const cli = new PageExperienceCli();
  const result = await cli.run('https://axios.com');
  console.log(JSON.stringify(result, null, 2));
})();
