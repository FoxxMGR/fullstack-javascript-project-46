import stylish from './stylish.js'

const formatters = {
  stylish,

}

const format = (tree, formatName = 'stylish') => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter(tree)
}

export default format
