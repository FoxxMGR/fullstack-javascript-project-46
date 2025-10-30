import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value) || _.isArray(value)) {
    return '[complex value]'
  }
  if (_.isString(value)) {
    return `'${value}'`
  }
  return value
}

const formatPlain = (tree, parentKey = '') => {
  const lines = tree.flatMap((node) => {
    const currentKey = parentKey ? `${parentKey}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${currentKey}' was added with value: ${formatValue(node.value)}`

      case 'removed':
        return `Property '${currentKey}' was removed`

      case 'changed':
        return `Property '${currentKey}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`

      case 'nested':
        return formatPlain(node.children, currentKey)

      case 'unchanged':
        return []

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
