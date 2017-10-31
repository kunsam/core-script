import commander from 'commander'
import config from '../config'

commander
  .version(config.version);

commander
  .command('test', 'test');

commander
  .command('init-project', 'open the guide of init a project')
  .command('xmind-ui', 'generates ui files from xmind tree')
  .command('xui', 'alias for xmind-ui')
  .command('xmind-plan', 'generates project plan files from xmind tree')
  .command('xplan', 'alias for xmind-plan')
  .command('recompose', 'use recompose faster')
  .command('rcp', 'alias for recompose')

commander.parse(process.argv);
