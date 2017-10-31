import commander from 'commander'
import config from '../config'

commander
  .version(config.version);


commander
  .command('init-project', 'open the guide of init a project')
  .command('init-core', 'create core.config.js')
  .command('xmind-ui', 'generates ui files from xmind tree')
  .command('xmind-plan', 'generates project plan files from xmind tree')
  .command('recompose', 'use recompose faster')
  .command('app-expand', 'expand a app busniess');

  console.log('----------下面是缩写的使用-------------')

commander
  .command('ipt', 'alias for init-project')
  .command('icr', 'alias for init-core')
  .command('xui', 'alias for xmind-ui')
  .command('xplan', 'alias for xmind-plan')
  .command('rcp', 'alias for recompose')
  .command('exp', 'alias for app-expand');

commander.parse(process.argv);
