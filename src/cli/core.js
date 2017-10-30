import commander from 'commander'
import config from '../config'

commander
  .version(config.version);

commander
  .command('test', 'test');

commander
  .command('xmind-ui', 'generates ui files from xmind tree')
  .command('xui', 'alias for generate');

commander.parse(process.argv);
