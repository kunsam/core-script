
import Head from '../../head'
import Container from '../../common/react/container'

export default ({ basePath, key, parserAbsolutePath }) => {
  return (
`
${Head({ basePath, key })}${Container({ parserAbsolutePath, key })}
`)
}



