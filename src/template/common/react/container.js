
export default ({ key }) => `
const ${key} = ({
  
}) => (
  <div className="${key}">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
  </div>
)

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, '${key}');
    return props
  }),
  setDisplayName('${key}')
)(${key})
`