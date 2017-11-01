
import Head from './head'
import Container from './common/react/container'

export default (basePath, key) => {
  return (
`import React from 'react'
${Head({ basePath, key })}
${Container({ key })}
`)
}



