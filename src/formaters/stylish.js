import _ from 'lodash'
const stringify = (value, depth = 0) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize)
  const nestedIndent = ' '.repeat((depth + 1) * indentSize)

  if (!_.isPlainObject(value)) {
    // Для примитивов и null возвращаем строку
    if (value === null) return 'null'
    if (value === '') return ''
    return String(value)
  }

  // Для объектов рекурсивно формируем строку
  const lines = Object.entries(value).map(
    ([key, val]) => `${nestedIndent}${key}: ${stringify(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${currentIndent}}`
}

const formatStylish = (tree) => {
  const iter = (nodes, depth = 1) => {
    const indentSize = 4
    const currentIndent = ' '.repeat(depth * indentSize - 2) // -2 для знаков +/-
    const nestedIndent = ' '.repeat(depth * indentSize)

    const lines = nodes.map((node) => {
      const makeLine = (value, sign) => {
        return `${currentIndent}${sign} ${node.key}: ${stringify(value, depth)}`
      }

      switch (node.type) {
        case 'added':
          return makeLine(node.value, '+')
        case 'removed':
          return makeLine(node.value, '-')
        case 'unchanged':
          return makeLine(node.value, ' ')
        case 'changed':
          return [
            makeLine(node.value1, '-'),
            makeLine(node.value2, '+'),
          ].join('\n')
        case 'nested':
          return `${currentIndent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${nestedIndent}}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

    return lines.join('\n')
  }

  return `{\n${iter(tree)}\n}`
}
export default formatStylish
