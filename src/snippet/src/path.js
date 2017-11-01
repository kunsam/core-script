
export function resolvePath(projectPath, outputPath) {
  if (outputPath && outputPath.charAt(0) === '/') {
    return outputPath
  } else {
    const path = require('path')
    return path.join(projectPath, outputPath)
  }
}
  