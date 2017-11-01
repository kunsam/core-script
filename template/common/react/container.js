import path from 'path'
import config from '../../../src/config'
import templateConfig from '../../config'


export default ({ parserAbsolutePath, key }) => `
const ${key} = ({
  
}) => (
  <div className="${key}">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
  </div>
)

${parserAbsolutePath ? `// [parser] // file:/${parserAbsolutePath}` : ''}

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, '${key}');
    return props
  }),
  setDisplayName('${key}')
)(${key})
`